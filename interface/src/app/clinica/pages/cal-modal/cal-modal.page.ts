import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Scheduling } from 'src/app/models/scheduling.model';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';
import { TotalService } from 'src/app/services/total.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements OnInit {
  id: string;
  title: string;
  titleUp: string;
  titleFormat: string;
  title_Format: string;
  // title_Format: string;
  startTime: string;
  month: string;
  hours: string;
  endTime: string;
  endTimeNumber: number;
  // desc: string;
  userId: string;
  userIdscheduling: string;
  agendamento;
  public idEdt = '';
  public titleEdt = '';
  public titleEdtUp = '';
  public titleEdtFormat = '';
  public titleEdt_Format = '';
  // public titleEdt_Format = '';
  public monthEdt = '';
  public startTimeEdt = '';
  public hoursEdt = '';
  public endTimeEdt = '';
  public userEdt = '';
  eventSource = [];
  agendamentos: Scheduling[] = [];
  private agendamentosSub: Subscription;

  sessions = [];
  private sessionsSub: Subscription;

  public string_id: String;
  isLoading = false;

  constructor(
    public modalController: ModalController,
    public navParams: NavParams,
    public userService: UserService,
    public router: ActivatedRoute,
    public schedulingService: SchedulingService,
    private navCtrl: NavController,
    private alertController: AlertController,
    public totalService: TotalService,
    private loadingCtrl: LoadingController,
    public sessionService: SessionService,
  ) {

    this.id = navParams.get('id');
    this.title = navParams.get('userById');
    this.titleUp = navParams.get('userById');
    this.titleFormat = navParams.get('userFormated');

    this.titleEdtFormat = this.titleFormat.slice(this.titleFormat.length - 11);

    this.startTime = navParams.get('startTime');
    this.month = navParams.get('month');
    this.hours = navParams.get('hours');
    this.endTime = navParams.get('endTime');
    this.endTimeNumber = parseInt(this.endTime);
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
      frm.value.titleEdt + ' - REMARCADO',
      frm.value.userEdt
    );

    this.initAgendamentos();
    this.showLoading();
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

  ngSubmits(form: any) {
    if (form.invalid) {
      return;
    }

    this.schedulingService.updateAgendamentoFinish(
      form.value.allDay = false,
      form.value.titleEdt + ' - CONCLUÍDO',
      form.value.idEdt,
      form.value.userEdt,
    );

    this.sessionService.totalUpSession(
      form.value.endTime,
      // form.value.idEdt,
      form.value.userEdt,
    )

    // this.initAgendamentos();

    setTimeout(() => {
      this.initAgendamentos();
      this.refreshScheduling();
      this.sessionRefresh();
      this.modalController.dismiss();
    }, 1000);
  }

  onDelete(agendamentoId: String) {
    this.schedulingService.deleteAgendamento(agendamentoId);
    setTimeout(() => {
      this.modalController.dismiss();
      this.refreshScheduling();
    }, 1000);
  }

  ngOnInit() {
    // this.isLoading = true;
    // this.initAgendamentos();
    this.getAgendamentos();
    this.refreshScheduling();
  }

  initAgendamentos() {
    this.schedulingService.getAgendamentos();
    this.agendamentosSub = this.schedulingService.getAgendamentosUpdated()
    .subscribe((agendamentos: Scheduling[]) => {
      this.agendamentos = agendamentos;
      // this.isLoading = false;
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
      // this.isLoading = false;
    })
  }

  close() {
    this.modalController.dismiss();
  }

  refreshScheduling() {
    this.schedulingService.getAgendamentos();
    this.agendamentosSub = this.schedulingService.getAgendamentosUpdated()
    .subscribe((agendamentos: Scheduling[]) => {
      // this.isLoading = false;
      this.agendamentos = agendamentos;
    })
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Salvando...',
      duration: 2000,
      cssClass: 'custom-loading',
    });
    loading.present();
  }

  sessionRefresh() {
    this.sessionService.getSession();
    this.sessionsSub = this.sessionService.getSessionUpdated()
    .subscribe((sessions) => {
      this.sessions = sessions;
    })
  }
}
