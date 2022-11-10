import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cash } from '../models/cash.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CashService {
  private cash: Cash[] = [];
  private cashsUpdated = new Subject<Cash[]>();

  constructor(private http: HttpClient) { }

  getCashs() {
    this.http.get<{ message: string, cashs: any, credit: any, debt: any, money: any, countMonth: any, creditTotal: any, debtTotal: any, moneyTotal: any, saleDay: any, saleMonth: any, cashsDayCredit: any, cashsDayDebt: any, cashsDayMoney: any, cashsMonthCredit: any, cashsMonthDebt: any, cashsMonthMoney: any, sessionId: any }>(environment.apiUrl + '/api/cash')
    .pipe(map((cashDate) => {
        return cashDate.cashs.map(cashs => {
          return {
            sessions: cashs.sessions,
            value: cashs.value,
            pay: cashs.pay,
            total: cashs.total,
            user: cashs.user._id,
            created: cashs.created,
            id: cashs._id
          }
        })
    }))
    .subscribe((transformedCash) => {
      this.cash = transformedCash;
      this.cashsUpdated.next([...this.cash]);
    });
  }

  addCash(
    // id: String,
    sessions: String,
    value: String,
    pay: String,
    total: String,
    user: String,
  ) {
    const cash = {
      id: null,
      sessions: sessions,
      value: value,
      pay: pay,
      total: total,
      user: user
    }
    console.log('service', cash);

    this.http.post<{ message: string }>(environment.apiUrl + '/api/cash', cash)
    .subscribe(() => {
      this.cash.push(cash);
      this.cashsUpdated.next([...this.cash]);
    });
  }

  getCashUpdated() {
    return this.cashsUpdated.asObservable();
  }

  getModule() {
    return this.http.get<{ message: string, cashs: any, credit: any, debt: any, money: any, countMonth: any, creditTotal: any, debtTotal: any, moneyTotal: any, saleDay: any, saleMonth: any, cashsDayCredit: any, cashsDayDebt: any, cashsDayMoney: any, cashsMonthCredit: any, cashsMonthDebt: any, cashsMonthMoney: any, sessionId: any  }>(environment.apiUrl + '/api/cash');
  }

  deleteCash(cashId: String) {
    this.http.delete(environment.apiUrl + '/api/cash/' + cashId)
    .subscribe(() => {
      const updatedCash = this.cash.filter(p => p.id !== cashId);
      this.cash = updatedCash;
      this.cashsUpdated.next([...this.cash]);
    });
  }
}
