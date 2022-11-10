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
          console.log(sessions);

          // return {
          //   sessions: cashs.sessions,
          //   value: cashs.value,
          //   pay: cashs.pay,
          //   total: cashs.total,
          //   user: cashs.user._id,
          //   created: cashs.created,
          //   id: cashs._id
          // }
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
  ) {

    const session = {
      // id: null,
      sessionPatient: sessionPatient,
      user: user,
    }

    this.http.post<{ message: string }>(environment.apiUrl + '/api/session', session)
    .subscribe(() => {
      this.sessions.push(session);
      this.sessionsUpdated.next([...this.sessions]);
    });
  }

  deleteSession(sessionId: String) {
    this.http.delete(environment.apiUrl + '/api/session/' + sessionId)
    .subscribe(() => {
      const updatedSession = this.session.filter(p => p.id !== sessionId);
      this.session = updatedSession;
      this.sessionUpdated.next([...this.session]);
    });
  }
}
