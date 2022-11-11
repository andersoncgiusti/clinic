import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { LoadingController } from '@ionic/angular';
import { Scheduling } from 'src/app/models/scheduling.model';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { Subscription } from 'rxjs';
import { CalModalPage } from 'src/app/paciente/pages/cal-modal/cal-modal.page';
import { CashService } from 'src/app/services/cash.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  eventSource = [];
  SourceEvent = [];
  viewTitle: string;
  showAddEvent: boolean;
  count: number;
  schedulingDay;
  sessionId;
  idSession;
  totalySessions;

  // agendamentos: Scheduling[] = [];
  // private agendamentosSub: Subscription;

  agendamentos = [];
  private agendamentosSub: Subscription;

  cashs = [];
  private cashsSub: Subscription;

  sessions = [];
  private sessionsSub: Subscription;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  newEvent: any = {
    title: '',
    // description: '',
    startTime: '',
    endTime: '',
    allDay: false
  }

  selectedDate: Date;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    public schedulingService: SchedulingService,
    public cashService: CashService,
    public sessionService: SessionService,
  ) {}

  ngOnInit() {
    this.getAgendamentosDay();
    this.schedulingService.getAgendamentos();
    this.agendamentosSub = this.schedulingService.getAgendamentosUpdated()
    .subscribe((agendamentos) => {
      this.agendamentos = agendamentos;

      const id = '6334ab53981b14a6d5babab3';

      const allscheduling = [];

      this.agendamentos.forEach((resp) => {
        if (resp.userById === id) {
          allscheduling.push({
            id: resp.id,
            title: resp.title,
            startTime: new Date(""+ `${resp.startTime}`+""),
            endTime: new Date(""+ `${resp.endTime}`+""),
            allDay: resp.allDay,
          })
        }
      })

      this.eventSource = allscheduling;
    })

    this.sessionService.getSession();
    this.sessionsSub = this.sessionService.getSessionUpdated()
    .subscribe((sessions) => {
      this.sessions = sessions;

      const id = '6334ab53981b14a6d5babab3';
      // const id = '6356ea69ab8e3e2745ca8ef3';
      const all = [];

      this.sessions.forEach((resp) => {
        if (resp.user === id) {
          all.push({
            sessionPatient: resp.sessionPatient
          })
        }
      })

      this.SourceEvent = all;
      let total = 0;
      for (const sessions of this.SourceEvent) {
        this.totalySessions = total += eval(sessions.sessionPatient)
      }
    })
  }

  getAgendamentosDay() {
    this.schedulingService.getAgendamentosDay()
    .subscribe((data) => {
      this.schedulingDay = data.agendamentoDay;
    });
  }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  async onEventSelected(ev) {
    this.getAgendamentosDay();
    this.newEvent = ev;

    const start = ev.startTime.toISOString().slice(0, 10);
    const startFormated = start.slice(start.length - 2);

    const calcHours = ev.startTime - ev.endTime;
    const endFormated = (calcHours / (- 3600000));

    const month = start.slice(start.length - 5);
    const monthFormated = month.slice(0, -3);

    const hours = ev.startTime.getHours();
    const concat = '0' + hours;

    const formated = concat.slice(concat.length - 2);

    const edt = {
      id: ev.id,
      title: ev.title,
      startTime: startFormated,
      month: monthFormated,
      hours: formated,
      endTime: endFormated.toString(),
      allDay: false
      // description: '',
    }

    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      componentProps: edt,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });

    return await modal.present();
  }

  showHideForm() {
    this.showAddEvent = !this.showAddEvent;
  }

  event = {
    title: '',
    // desc: '',
    startTime: '',
    day: '',
    month: '',
    endTime: '',
    allDay: false,
    user: ''
  };

  createEvents() {
    this.getAgendamentosDay();
    const events = [];
    const date = new Date();

    const year = date.getFullYear();
    const month = this.event.month;
    const day = this.event.day;

    this.modalCtrl.dismiss({event: this.event});
    const result = year + "-" + month + "-" + day;

    const start = parseInt(this.event.startTime);
    const end = eval(start + '+' + this.event.endTime);
    const concat = '0' + end;
    const formated = concat.slice(concat.length - 2);

    const startTime = new Date(""+`${result}`+"T"+`${this.event.startTime}`+""+":00:00-03:00");
    const endTime = new Date(""+`${result}`+"T"+`${formated}`+""+":00:00-03:00");

    events.push({
      title: this.event.title,
      // desc: this.event.desc,
      startTime: startTime.toString(),
      day: this.event.day,
      month: this.event.month,
      endTime: endTime.toString(),
      allDay: false,
      user: this.event.user
    })

    this.schedulingService.addAgendamento(
      this.event.title,
      // this.event.desc,
      this.event.startTime,
      this.event.day,
      this.event.month,
      this.event.endTime,
      this.event.allDay,
      this.event.user
    )

    this.eventSource = events;
  }

  clear() {
    setTimeout(()=> {
      this.event.title = "";
      this.event.day = "";
      this.event.month = "";
      this.event.startTime = "";
      this.event.endTime = "";
      // this.event.desc;
    }, 1000)
  }

  // async showLoading() {
  //   const loading = await this.loadingCtrl.create({
  //     duration: 3000,
  //     cssClass: 'custom-loading',
  //   });
  //   loading.present();
  // }


}
