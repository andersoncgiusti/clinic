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
    this.http.get<{ message: string, cashs: any, credit: any, debt: any, money: any, countMonth: any, creditTotal: any, debtTotal: any, moneyTotal: any }>(environment.apiUrl + '/api/cash')
    .pipe(map((cashDate) => {
      return cashDate.cashs.map(cashs => {
        return {
          sessions: cashs.sessions,
          value: cashs.value,
          pay: cashs.pay,
          total: cashs.total,
          id: cashs._id
        }
      })
    }))
    .subscribe((transformedCash) => {
      this.cash = transformedCash;
      this.cashsUpdated.next([...this.cash]);
    });
  }

  getCashUpdated() {
    return this.cashsUpdated.asObservable();
  }

  getModule() {
    return this.http.get<{ message: string, cashs: any, credit: any, debt: any, money: any, countMonth: any, creditTotal: any, debtTotal: any, moneyTotal: any }>(environment.apiUrl + '/api/cash');
  }
}
