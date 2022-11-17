import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Chart } from 'src/app/models/chart.model';
import { userChart } from 'src/app/models/user-chart.model';
import { User } from 'src/app/models/user.model';
import { ChartService } from 'src/app/services/chart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chart-id',
  templateUrl: './chart-id.page.html',
  styleUrls: ['./chart-id.page.scss'],
})
export class ChartIdPage implements OnInit {

  usersPacient: User[] = [];
  eventSource = [];

  user;
  charts;
  date;
  dateFormated;
  array;
  idUser;
  event;

  private userPacientId: String;
  private usersSubPacien: Subscription;

  prontuarios: Chart[] = [];
  private prontuariosSub: Subscription;

  private userPacient: User;
  private usersSubPacient: Subscription;

  userChart: userChart[] = [];
  private usersSubChart: Subscription;

  public id = '';
  public userName = '';
  public userLastName = '';
  public userState = '';
  public idChart = '';
  public treatment = '';
  public created = '';
  isLoading = false;

  constructor(
    public userService: UserService,
    public router: ActivatedRoute,
    public chartService: ChartService,
    private navCtrl: NavController,
    public modalController: ModalController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.getChartParams();
    this.getUsersCharts();
    this.chartsId();

    this.chartService.getCharts();
    this.prontuariosSub = this.chartService.getChartUpdated()
    .subscribe((prontuarios: Chart[]) => {
      this.prontuarios = prontuarios;
      this.isLoading = false;
    })

    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('userPacientId');
      this.user = this.userService.getChartId(this.id);
      this.idUser = this.user.id;
      //// ajustar idade
      this.userService.getChartsUser(this.idUser);
      this.usersSubChart = this.userService.getChartUsersPacientUpdated()
      .subscribe((usersChart: userChart[]) => {
        this.userChart = usersChart;
        this.userChart.forEach(element => {
          this.date = element.created;
          this.dateFormated = this.date.slice(0, 10);
          this.isLoading = false;
        });
      });
    })
  }


  getChartParams() {
    this.isLoading = true;
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('userPacientId');
      this.user = this.userService.getChartId(this.id);
      this.idUser = this.user.id;
      //// ajustar idade
      this.userService.getChartsUser(this.idUser);
      this.usersSubChart = this.userService.getChartUsersPacientUpdated()
      .subscribe((usersChart: userChart[]) => {
        this.userChart = usersChart;
        // this.userChart.forEach(element => {
        //   this.date = element.created;
        //   this.dateFormated = this.date.slice(0, 10);
        // });
        this.isLoading = false;
      });
    })
  }

  chartsId() {
    this.isLoading = true;
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('userPacientId');
      this.user = this.userService.getChartId(this.id);
      this.idUser = this.user.id;
      this.isLoading = false;
    })
  }

  events = {
    treatment: '',
  };

  ngSubmit(frm: any) {
    if (frm.invalid) {
      return;
    }

    this.userService.updateChart(
      frm.value.idChart,
      this.events.treatment
    )

    setTimeout(()=> {
      this.getChartParams();
      this.modalController.dismiss();
      this.events.treatment = ''
    }, 1000);

    this.showLoading();
  }

  getUsersCharts() {
    this.isLoading = true;
    this.userService.getUsersPacient();
    this.usersSubPacient = this.userService.getUsersPacientUpdated()
    .subscribe((usersPacient: User[]) => {
      this.usersPacient = usersPacient;
      this.isLoading = false;
    });
  }

  navigateChart() {
    this.getUsersCharts();
    this.navCtrl.navigateRoot('/fisioterapeuta/tab2');
  }

  onDelete(chartId: String) {
    this.chartService.deleteChart(chartId);
    setTimeout(() => {
      this.getChartParams();
    }, 1000);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Salvando...',
      duration: 2000,
      cssClass: 'custom-loading',
    });
    loading.present();
  }
}
