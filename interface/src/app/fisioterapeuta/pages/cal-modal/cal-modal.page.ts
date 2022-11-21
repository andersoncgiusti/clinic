import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Scheduling } from 'src/app/models/scheduling.model';
import { AuthService } from 'src/app/services/auth.service';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { SessionService } from 'src/app/services/session.service';
import { TotalService } from 'src/app/services/total.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements OnInit, OnDestroy {
  id: string;
  title: string;
  startTime: string;
  month: string;
  hours: string;
  endTime: string;
  endTimeNumber: number;
  // desc: string;
  userIdscheduling: string;
  user: string;
  agendamento;

  public idEdt = '';
  public titleEdt = '';
  public monthEdt = '';
  public startTimeEdt = '';
  public hoursEdt = '';
  public endTimeEdt = '';
  public titleEdtFormat = '';

  eventSource = [];

  agendamentos: Scheduling[] = [];
  private agendamentosSub: Subscription;
  isLoading = false;

  sessions = [];
  private sessionsSub: Subscription;

  userIsAuthenticated = false;
  private authStatusSub!: Subscription;

  constructor(
    public modalController: ModalController,
    public navParams: NavParams,
    public userService: UserService,
    public router: ActivatedRoute,
    public schedulingService: SchedulingService,
    private navCtrl: NavController,
    public totalService: TotalService,
    public sessionService: SessionService,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {

    this.id = navParams.get('id');
    this.title = navParams.get('title');
    this.titleEdtFormat = this.title.slice(this.title.length - 11);
    this.startTime = navParams.get('startTime');
    this.month = navParams.get('month');
    this.hours = navParams.get('hours');
    this.endTime = navParams.get('endTime');
    this.endTimeNumber = parseInt(this.endTime);
    this.userIdscheduling = navParams.get('user');
  }

  events = {
    treatment: '',
  };

  ngSubmit(frm: any) {
    if (frm.invalid) {
      return;
    }

    this.schedulingService.updateAgendamentoFinish(
      frm.value.allDay = false,
      frm.value.titleEdt + ' - CONCLUÍDO',
      frm.value.idEdt,
      frm.value.userEdt,
    );

    this.userService.updateChart(
      frm.value.idChart,
      frm.value.treatment
    )

    // this.totalService.totalUp(
    //   frm.value.endTime,
    //   frm.value.idChart
    // )

    this.sessionService.totalUpSession(
      frm.value.endTime,
      frm.value.idChart
    )

    setTimeout(()=> {
      this.refreshScheduling();
      this.sessionRefresh();
      this.modalController.dismiss();
      this.events.treatment = ''
    }, 1000);

    this.showLoading();
  }

  clear() {
    this.events.treatment = ''
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    // this.isLoading = true;
    // this.refreshScheduling();
    this.getAgendamentos();
    this.initAgendamentos();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
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

