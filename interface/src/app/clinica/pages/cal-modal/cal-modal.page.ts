import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Scheduling } from 'src/app/models/scheduling.model';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements OnInit {
  id: string;
  title: string;
  titleUp: string;
  startTime: string;
  month: string;
  hours: string;
  endTime: string;
  // desc: string;
  userId: string;
  userIdscheduling: string;
  agendamento;
  public idEdt = '';
  public titleEdt = '';
  public titleEdtUp = '';
  public monthEdt = '';
  public startTimeEdt = '';
  public hoursEdt = '';
  public endTimeEdt = '';
  public userEdt = '';
  eventSource = [];
  agendamentos: Scheduling[] = [];
  private agendamentosSub: Subscription;

  public string_id: String;

  constructor(
    public modalController: ModalController,
    public navParams: NavParams,
    public userService: UserService,
    public router: ActivatedRoute,
    public schedulingService: SchedulingService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {

    this.id = navParams.get('id');
    this.title = navParams.get('userById');
    this.titleUp = navParams.get('userById');
    console.log(this.titleUp);

    this.startTime = navParams.get('startTime');
    this.month = navParams.get('month');
    this.hours = navParams.get('hours');
    this.endTime = navParams.get('endTime');
    this.userId = navParams.get('user');
    // this.desc = navParams.get('desc');
    this.userIdscheduling = navParams.get('userById');
  }

  ngSubmit(frm: any) {
    if (frm.invalid) {
      return;
    }

    this.schedulingService.updateAgendamento(
      frm.value.allDay = false,
      frm.value.endTimeEdt,
      frm.value.hoursEdt,
      frm.value.idEdt,
      frm.value.monthEdt,
      frm.value.startTimeEdt,
      frm.value.titleEdt,
      frm.value.userEdt
    );

    this.initAgendamentos();

    setTimeout(() => {
      this.initAgendamentos();
      this.refreshScheduling();
      this.modalController.dismiss();
    }, 1000);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Finalizar Sessão',
      subHeader: 'Deseja confirmar que o paciente realizou a sessão?',
      message: 'Clique em Confirmar',
      buttons: ['Confirmar'],
    });

    await alert.present();
  }

  event = {
    userId: '',
    titleUp: '',
    endTime: '',
  }

  finish(){
    const events = [];
    console.log(this.event);

    events.push({
      userId: this.event.userId,
      titleUp: this.event.titleUp,
      endTime: this.event.endTime
    })

    // this.schedulingService.updateAgendamento(
    //   this.event.id,
    //   this.event.name,
    //   this.event.total
    // )

    this.eventSource = events;
    console.log(this.eventSource);
  }




  onDelete(agendamentoId: String) {
    this.schedulingService.deleteAgendamento(agendamentoId);
    setTimeout(() => {
      this.modalController.dismiss();
      this.refreshScheduling();
    }, 1000);
  }

  ngOnInit() {
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
          title: resp.title,
          startTime: new Date(""+ `${resp.startTime}`+""),
          endTime: new Date(""+ `${resp.endTime}`+""),
          allDay: resp.allDay,
        })
      })

      this.eventSource = allscheduling;
    })
  }

  getAgendamentos() {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      this.agendamento = this.schedulingService.getAgendamentosId(this.id);
    })
  }

  close() {
    this.modalController.dismiss();
  }

  refreshScheduling() {
    this.schedulingService.getAgendamentos();
    this.agendamentosSub = this.schedulingService.getAgendamentosUpdated()
    .subscribe((agendamentos: Scheduling[]) => {
      this.agendamentos = agendamentos;
    })
  }

}
