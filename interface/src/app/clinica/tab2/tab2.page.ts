import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { CalModalPage } from '../pages/cal-modal/cal-modal.page';
import { LoadingController } from '@ionic/angular';
import { Scheduling } from 'src/app/models/scheduling.model';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  eventSource = [];
  viewTitle: string;
  showAddEvent: boolean;
  count: number;
  schedulingDay;
  userCpf: number;
  agendamentos: Scheduling[] = [];
  private agendamentosSub: Subscription;
  private user: User;
  private usersSub: Subscription;
  users: User[] = [];
  public cpf = '';

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  newEvent: any = {
    title: '',
    // description: '',
    startTime: '',
    endTime: '',
    allDay: false,
    user: ''
  }

  selectedDate: Date;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    public schedulingService: SchedulingService,
    public userService: UserService,
  ) {}

  ngOnInit() {
    this.getAgendamentosDay();
    this.schedulingService.getAgendamentos();
    this.agendamentosSub = this.schedulingService.getAgendamentosUpdated()
    .subscribe((agendamentos) => {
      this.agendamentos = agendamentos;

      const allscheduling = [];

      this.agendamentos.forEach((resp) => {
        allscheduling.push({
          id: resp.id,
          title: resp.title,
          startTime: new Date(""+ `${resp.startTime}`+""),
          endTime: new Date(""+ `${resp.endTime}`+""),
          allDay: resp.allDay,
          user: resp
        })
      })

      this.eventSource = allscheduling;
    })

    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdated()
    .subscribe((users: User[]) => {
      this.users = users;
      this.users.forEach((res) => {
        this.cpf = res.userCpf.replace(/[^0-9]/g, "").replace(/^([\d]{3})([\d]{3})?([\d]{3})?([\d]{2})?/, "$1.$2.$3-$4");
      })
    });
  }

  updatedScheduling() {
    this.schedulingService.getAgendamentos();
    this.agendamentosSub = this.schedulingService.getAgendamentosUpdated()
    .subscribe((agendamentos) => {
      this.agendamentos = agendamentos;

      const allscheduling = [];

      this.agendamentos.forEach((resp) => {
        allscheduling.push({
          id: resp.id,
          title: resp.title,
          startTime: new Date(""+ `${resp.startTime}`+""),
          endTime: new Date(""+ `${resp.endTime}`+""),
          allDay: resp.allDay,
          user: resp
        })
      })

      this.eventSource = allscheduling;
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
      // title: ev.title,
      startTime: startFormated,
      month: monthFormated,
      hours: formated,
      endTime: endFormated.toString(),
      allDay: false,
      user: ev.user.user._id,
      userById: ev.user.user.userName
    };

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
      startTime: startTime.toString(),
      day: this.event.day,
      month: this.event.month,
      endTime: endTime.toString(),
      allDay: false,
      user: this.event.user
    })

    this.schedulingService.addAgendamento(
      this.event.title,
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
      this.updatedScheduling();
    }, 1000)
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 3000,
      cssClass: 'custom-loading',
    });
    loading.present();
  }
}

