import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Scheduling } from 'src/app/models/scheduling.model';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements OnInit {
  id: string;
  title: string;
  startTime: string;
  month: string;
  hours: string;
  endTime: string;
  // desc: string;
  agendamento;
  public idEdt = '';
  public titleEdt = '';
  public monthEdt = '';
  public startTimeEdt = '';
  public hoursEdt = '';
  public endTimeEdt = '';
  eventSource = [];
  agendamentos: Scheduling[] = [];
  private agendamentosSub: Subscription;

  constructor(
    public modalController: ModalController,
    public navParams: NavParams,
    public userService: UserService,
    public router: ActivatedRoute,
    public schedulingService: SchedulingService,
    private navCtrl: NavController
  ) {

    this.id = navParams.get('id');
    this.title = navParams.get('title');
    this.startTime = navParams.get('startTime');
    this.month = navParams.get('month');
    this.hours = navParams.get('hours');
    this.endTime = navParams.get('endTime');
    // this.desc = navParams.get('desc');
  }

  events = {
    id: '6334ab53981b14a6d5babab3',
    treatment: '',
  };

  ngSubmit(frm: any) {
    if (frm.invalid) {
      return;
    }

    this.userService.updateChart(
      this.events.id,
      this.events.treatment
    )

    setTimeout(()=> {
      this.modalController.dismiss();
      this.events.id = ''
      this.events.treatment = ''
    }, 1000);
  }



  ngOnInit() {
    this.getAgendamentos();
    // this.initAgendamentos();
    // this.refreshScheduling();
  }

  // initAgendamentos() {
  //   this.schedulingService.getAgendamentos();
  //   this.agendamentosSub = this.schedulingService.getAgendamentosUpdated()
  //   .subscribe((agendamentos: Scheduling[]) => {
  //     this.agendamentos = agendamentos;

  //     const allscheduling = [];

  //     this.agendamentos.forEach((resp) => {
  //       allscheduling.push({
  //         id: resp.id,
  //         title: resp.title,
  //         startTime: new Date(""+ `${resp.startTime}`+""),
  //         endTime: new Date(""+ `${resp.endTime}`+""),
  //         allDay: resp.allDay,
  //       })
  //     })

  //     this.eventSource = allscheduling;
  //   })
  // }

  getAgendamentos() {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      this.agendamento = this.schedulingService.getAgendamentosId(this.id);
    })
  }

  close() {
    this.modalController.dismiss();
  }

  // refreshScheduling() {
  //   this.schedulingService.getAgendamentos();
  //   this.agendamentosSub = this.schedulingService.getAgendamentosUpdated()
  //   .subscribe((agendamentos: Scheduling[]) => {
  //     this.agendamentos = agendamentos;
  //   })
  // }

}

