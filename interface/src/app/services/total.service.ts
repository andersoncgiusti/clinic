import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Total } from '../models/total.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TotalService {
  private total: Total[] = [];
  private totalUpdated = new Subject<Total[]>();

  private totals = [];
  private totalsUpdated = new Subject();

  constructor(private http: HttpClient) { }

  getTotal() {
    this.http.get<{ message: string, total: any }>(environment.apiUrl + '/api/total')
    .pipe(map((totalDate) => {
      return totalDate.total.map(totals => {
          return {
            user: totals.user._id,
            sessionPatient: totals.sessionPatient,
            id: totals._id
          }
        })
    }))
    .subscribe((transformedSession) => {
      this.total = transformedSession;
      this.totalUpdated.next([...this.total]);
    });
  }

  getTotalUpdated() {
    return this.totalUpdated.asObservable();
  }

  addTotal(
    // id: String,
    sessionPatient: String,
    user: String,
  ) {

    const total = {
      // id: null,
      sessionPatient: sessionPatient,
      user: user,
    }
    console.log(total);

    this.http.put<{ message: string }>(environment.apiUrl + '/api/total', total)
    .subscribe(() => {
      const updatedTotal = this.total.filter(total => total.id !== user);
      this.total = updatedTotal;
      this.totalUpdated.next([...this.total]);
    });
  }

  updateTotal(
    totalId: String,
    sessionPatient: String,
    user: String,
  ) {

    const total = {
      id: totalId,
      sessionPatient: sessionPatient,
      user: user,
    }
    console.log(total);

    this.http.put<{ message: string }>(environment.apiUrl + '/api/total/' + totalId, total)
    .subscribe(() => {
      const updatedTotal = this.total.filter(total => total.id !== totalId);
      this.total = updatedTotal;
      this.totalUpdated.next([...this.total]);
    });
  }
}
