import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Session } from '../models/session.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private session: Session[] = [];
  private sessionUpdated = new Subject<Session[]>();

  private sessions = [];
  private sessionsUpdated = new Subject();

  constructor(private http: HttpClient) { }

  getSession() {
    this.http.get<{ message: string, session: any }>(environment.apiUrl + '/api/session')
    .pipe(map((sessionDate) => {
      return sessionDate.session.map(sessions => {
          return {
            sessionPatient: sessions.sessionPatient,
            user: sessions.user._id,
            userName: sessions.user.userName,
            id: sessions._id
          }
        })
    }))
    .subscribe((transformedSession) => {
      this.session = transformedSession;
      this.sessionUpdated.next([...this.session]);
    });
  }

  getSessionUpdated() {
    return this.sessionUpdated.asObservable();
  }

  getSessionUpdate() {
    return this.sessionsUpdated.asObservable();
  }

  addSession(
    // id: String,
    sessionPatient: String,
    user: String,
    userName: String,
  ) {

    const session = {
      // id: null,
      sessionPatient: sessionPatient,
      user: user,
      userName: userName,
    }

    this.http.post<{ message: string }>(environment.apiUrl + '/api/session', session)
    .subscribe(() => {
      this.sessions.push(session);
      this.sessionsUpdated.next([...this.sessions]);
    });
  }

  addSessionStart(
    // id: String,
    sessionPatient: String,
    user: String,
    // userName: String,
  ) {

    const session = {
      // id: null,
      sessionPatient: sessionPatient,
      user: user,
      // userName: userName,
    }

    this.http.put<{ message: string }>(environment.apiUrl + '/api/session', session)
    .subscribe(() => {
      const updatedTotal = this.session.filter(total => total.id !== user);
      this.session = updatedTotal;
      this.sessionUpdated.next([...this.session]);
    });
  }

  deleteSession(cashtId: String) {
    this.http.delete(environment.apiUrl + '/api/session/' + cashtId)
    .subscribe(() => {
      const updatedSession = this.session.filter(p => p.id !== cashtId);
      this.session = updatedSession;
      this.sessionUpdated.next([...this.session]);
    });
  }

  totalUpSession(
    sessionPatient: Number,
    // sessionId: String,
    user: String,
  ) {

    const session = {
      sessionPatient: sessionPatient,
      // sessionId: sessionId,
      user: user,
    }

    this.http.put<{ message: string }>(environment.apiUrl + '/api/session_total', session)
    .subscribe(() => {
      const updatedTotal = this.session.filter(total => total.id !== user);
      this.session = updatedTotal;
      this.sessionUpdated.next([...this.session]);
    });
  }
}
