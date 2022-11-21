import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Scheduling } from 'src/app/models/scheduling.model';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { AnimationController } from '@ionic/angular';
import { Chart } from 'src/app/models/chart.model';
import { ChartService } from 'src/app/services/chart.service';
import { CashService } from 'src/app/services/cash.service';
import { Cash } from 'src/app/models/cash.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authStatusSub!: Subscription;

  users: User[] = [];
  private usersSub: Subscription;

  agendamentos: Scheduling[] = [];
  private agendamentosSub: Subscription;

  prontuarios: Chart[] = [];
  private prontuariosSub: Subscription;

  cashs: Cash[] = [];
  private cashsSub: Subscription;

  modal = false;
  showAddEvent: boolean;
  isModalOpen = false;
  showAdd: boolean;
  isLoading = false;
  pacient;
  administrator;
  physiotherapist;
  schedulingDay;
  schedulingMonth;
  credit;
  debt;
  money;

  detail = '';
  eventSource = [];

  constructor(
    private loadingCtrl: LoadingController,
    public userService: UserService,
    public schedulingService: SchedulingService,
    public chartService: ChartService,
    public cashService: CashService,
    private animationCtrl: AnimationController,
    public authService: AuthService
    ) {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Salvando...',
      duration: 3000,
      cssClass: 'custom-loading',
    });

    loading.present();
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.isLoading = true;
    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdated()
    .subscribe((users: User[]) => {
      this.users = users;
      this.isLoading = false;
    })

    this.schedulingService.getAgendamentos();
    this.agendamentosSub = this.schedulingService.getAgendamentosUpdated()
    .subscribe((agendamentos: Scheduling[]) => {
      this.agendamentos = agendamentos;
      this.isLoading = false;
    })

    this.chartService.getCharts();
    this.prontuariosSub = this.chartService.getChartUpdated()
    .subscribe((prontuarios: Chart[]) => {
      this.prontuarios = prontuarios;
      this.isLoading = false;
    })

    this.userService.getPermission()
    .subscribe((data) => {
      this.pacient = data.pacient;
      this.administrator = data.administrator;
      this.physiotherapist = data.physiotherapist;
      this.isLoading = false;
    });

    this.schedulingService.getAgendamentosDay()
    .subscribe((data) => {
      this.schedulingDay = data.agendamentoDay;
      this.schedulingMonth = data.agendamentoMonth;
      this.isLoading = false;
    });

    this.cashService.getModule()
    .subscribe((data) => {
      this.credit = data.credit;
      this.debt = data.debt;
      this.money = data.money;
      this.isLoading = false;
    });

  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  openModal() {
    this.modal = !this.modal;
  }

  showHideForm() {
    this.showAddEvent = !this.showAddEvent;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  showHide() {
    this.showAdd = !this.showAdd;
  }

  details(id) {
    this.detail = this.detail == id ? '':id;
  }
}
