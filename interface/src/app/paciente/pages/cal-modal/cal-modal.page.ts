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
  isLoading = false;

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

  // ngSubmit(frm: any) {
  //   if (frm.invalid) {
  //     return;
  //   }

  //   this.schedulingService.updateAgendamento(
  //     frm.value.allDay = false,
  //     frm.value.endTimeEdt,
  //     frm.value.hoursEdt,
  //     frm.value.idEdt,
  //     frm.value.monthEdt,
  //     frm.value.startTimeEdt,
  //     frm.value.titleEdt
  //   );

  //   this.initAgendamentos();

  //   setTimeout(() => {
  //     this.initAgendamentos();
  //     this.refreshScheduling();
  //     this.modalController.dismiss();
  //   }, 1000);
  // }

  // onDelete(agendamentoId: String) {
  //   this.schedulingService.deleteAgendamento(agendamentoId);
  //   setTimeout(() => {
  //     this.modalController.dismiss();
  //     this.refreshScheduling();
  //   }, 1000);
  // }

  ngOnInit() {
    // this.isLoading = true;
    this.getAgendamentos();
    this.initAgendamentos();
    this.refreshScheduling();
  }

  initAgendamentos() {
    this.schedulingService.getAgendamentos();
    this.agendamentosSub = this.schedulingService.getAgendamentosUpdated()
    .subscribe((agendamentos: Scheduling[]) => {
      this.agendamentos = agendamentos;

      const allscheduling = [];

      this.agendamentos.forEach((resp) => {
        allscheduling.push({
          id: resp.id,
          // title: resp.title,
          startTime: new Date(""+ `${resp.startTime}`+""),
          endTime: new Date(""+ `${resp.endTime}`+""),
          allDay: resp.allDay,
        })
      })

      this.eventSource = allscheduling;
      // this.isLoading = false;
    })
  }

  getAgendamentos() {
    // this.isLoading = true;
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      this.agendamento = this.schedulingService.getAgendamentosId(this.id);
      // this.isLoading = false;
    })
  }

  close() {
    this.modalController.dismiss();
  }

  refreshScheduling() {
    // this.isLoading = true;
    this.schedulingService.getAgendamentos();
    this.agendamentosSub = this.schedulingService.getAgendamentosUpdated()
    .subscribe((agendamentos: Scheduling[]) => {
      this.agendamentos = agendamentos;
      // this.isLoading = false;
    })
  }
}
