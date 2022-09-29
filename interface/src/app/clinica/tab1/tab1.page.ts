import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Scheduling } from 'src/app/models/scheduling.model';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { AnimationController } from '@ionic/angular';
import { Chart } from 'src/app/models/chart.model';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  users: User[] = [];
  private usersSub: Subscription;

  agendamentos: Scheduling[] = [];
  private agendamentosSub: Subscription;

  prontuarios: Chart[] = [];
  private prontuariosSub: Subscription;

  modal = false;
  showAddEvent: boolean;
  isModalOpen = false;
  showAdd: boolean;

  pacient;
  administrator;
  physiotherapist;
  schedulingDay;
  schedulingMonth;

  detail = '';
  eventSource = [];

  constructor(
    private loadingCtrl: LoadingController,
    public userService: UserService,
    public schedulingService: SchedulingService,
    public chartService: ChartService,
    private animationCtrl: AnimationController
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
    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdated()
    .subscribe((users: User[]) => {
      this.users = users;
    })

    this.schedulingService.getAgendamentos();
    this.agendamentosSub = this.schedulingService.getAgendamentosUpdated()
    .subscribe((agendamentos: Scheduling[]) => {
      this.agendamentos = agendamentos;
    })

    this.chartService.getCharts();
    this.prontuariosSub = this.chartService.getChartUpdated()
    .subscribe((prontuarios: Chart[]) => {
      this.prontuarios = prontuarios;
    })

    this.userService.getPermission()
    .subscribe((data) => {
      this.pacient = data.pacient;
      this.administrator = data.administrator;
      this.physiotherapist = data.physiotherapist;
    });

    this.schedulingService.getAgendamentosDay()
    .subscribe((data) => {
      this.schedulingDay = data.agendamentoDay;
      this.schedulingMonth = data.agendamentoMonth;
    });

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

  chartEvent = {
    // id: '',
    chartDescription: ''
  };

  createChart() {
    const prontuarios = [];

    prontuarios.push({
      chartDescription: this.chartEvent.chartDescription
    });

    this.chartService.addChart(
      this.chartEvent.chartDescription
    )

    this.eventSource = prontuarios;
    console.log(this.eventSource);

  }

  clearChart() {
    setTimeout(()=> {
      this.chartEvent.chartDescription = ''
    }, 1000);
  }
}
