import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Scheduling } from '../models/scheduling.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {
  private agendamentos: Scheduling[] = [];
  private agendamentosUpdated = new Subject<Scheduling[]>();

  private agendamento = [];
  private agendamentoUpdated = new Subject();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getAgendamentos() {
    // this.http.get<{ message: string, agendamento: Scheduling[]}>(environment.apiUrl + '/api/agendamento')
    // .subscribe((agendamentoData) => {
    //   console.log('agendamentoData', agendamentoData.agendamento);

    //   this.agendamentos = agendamentoData.agendamento;
    //   this.agendamentosUpdated.next([...this.agendamentos]);
    // });

    this.http.get<{ message: string, agendamento: any }>(environment.apiUrl + '/api/agendamento')
    .pipe(map((agendamentosData) => {
      return agendamentosData.agendamento.map(agendamento => {
        return {
          title: agendamento.scheduleTitle,
          startTime: agendamento.scheduleStartTime,
          endTime: agendamento.scheduleEndTime,
          // allDay: agendamento.allDay,
          id: agendamento._id,
          user: agendamento.user,
          userById: agendamento.user._id
        }
      })
    }))
    .subscribe((transformedAgendamento) => {
      this.agendamentos = transformedAgendamento;
      this.agendamentosUpdated.next([...this.agendamentos]);
    });
  }

  getAgendamentosDay() {
    return this.http.get<{ message: string, agendamento: any, agendamentoDay: any, agendamentoMonth: any }>(environment.apiUrl + '/api/agendamento');
  }

  getAgendamentosUpdated() {
    return this.agendamentosUpdated.asObservable();
  }

  getAgendamentosId(id: string) {
    return { id };
  }

  addAgendamento(
    title: String,
    startTime: String,
    day: string,
    month: string,
    endTime: String,
    allDay: boolean,
    user: String
  ) {

    const date = new Date();
    const year = date.getFullYear();
    const months = month;
    const days = day;
    const result = year + "-" + months + "-" + days;
    const start = parseInt(startTime.toString());
    const end = eval(start + '+' + endTime);
    const concat = '0' + end;
    const formated = concat.slice(concat.length - 2);
    const startTimes = new Date(""+`${result}`+"T"+`${startTime}`+""+":00:00-03:00");
    const initial = startTimes.toString();
    const endTimes = new Date(""+`${result}`+"T"+`${formated}`+""+":00:00-03:00");
    const finaly = endTimes.toString();

    const scheduling = {
      id: null,
      title: title,
      startTime: initial,
      endTime: finaly,
      allDay: allDay,
      user: user
    }

    this.http.post<{ message: string, agendamentoId: string }>(environment.apiUrl + '/api/agendamento', scheduling)
    .subscribe((responseData) => {
      const id = responseData.agendamentoId;
      scheduling.id = id;
      this.agendamentos.push(scheduling);
      this.agendamentosUpdated.next([...this.agendamentos]);
      // this.router.navigate(["/clinica/tab2"]);
    });
  }

  updateAgendamento(
    allDay: boolean,
    endTime: String,
    hours: String,
    agendamentoId: String,
    month: String,
    startTime: String,
    title: String,
    user: String
  ) {

    const date = new Date();
    const year = date.getFullYear();
    const months = month;
    const days = startTime;
    const result = year + "-" + months + "-" + days;
    const start = parseInt(hours.toString());
    const end = eval(start + '+' + endTime);
    const concat = '0' + end;
    const formated = concat.slice(concat.length - 2);
    const startTimes = new Date(""+`${result}`+"T"+`${hours}`+""+":00:00-03:00");
    const initial = startTimes.toString();
    const endTimes = new Date(""+`${result}`+"T"+`${formated}`+""+":00:00-03:00");
    const finaly = endTimes.toString();

    const scheduling = {
      id: agendamentoId,
      title: title,
      startTime: initial,
      endTime: finaly,
      allDay: allDay,
      user: user
    }

    this.http.put(environment.apiUrl + '/api/agendamento/' + agendamentoId, scheduling)
    .subscribe(() => {
      // const agendamentosUpdated = [...this.agendamentos];
      // const oldAgendamentosIndex = agendamentosUpdated.findIndex(agendamento => agendamento.id !== agendamentoId)
      // agendamentosUpdated[oldAgendamentosIndex] = scheduling;
      // this.agendamentos = agendamentosUpdated;
      // this.agendamentosUpdated.next([...this.agendamentos])
      // this.router.navigate(["/"]);

      const updatedAgendamento = this.agendamentos.filter(agendamento => agendamento.id !== agendamentoId);
      this.agendamentos = updatedAgendamento;
      this.agendamentosUpdated.next([...this.agendamentos]);
      // this.router.navigate(["/clinica/tab2"]);
    });
  }

  updateAgendamentoFinish(
    allDay: boolean,
    title: String,
    agendamentoId: String,
    user: String
  ) {

    const scheduling = {
      allDay: allDay,
      title: title,
      id: agendamentoId,
      user: user
    }
    console.log(scheduling);

    this.http.put(environment.apiUrl + '/api/agendamento_finish/' + agendamentoId, scheduling)
    .subscribe(() => {
      const updatedAgendamento = this.agendamentos.filter(agendamento => agendamento.id !== agendamentoId);
      this.agendamento = updatedAgendamento;
      this.agendamentoUpdated.next([...this.agendamento]);
    });
  }

  deleteAgendamento(agendamentoId: String) {
    this.http.delete(environment.apiUrl + '/api/agendamento/' + agendamentoId)
    .subscribe(() => {
      const updatedAgendamento = this.agendamentos.filter(agendamento => agendamento.id !== agendamentoId);
      this.agendamentos = updatedAgendamento;
      this.agendamentosUpdated.next([...this.agendamentos]);
    });
  }
}
