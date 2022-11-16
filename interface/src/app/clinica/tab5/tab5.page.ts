import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chart } from 'src/app/models/chart.model';
import { User } from 'src/app/models/user.model';
import { ChartService } from 'src/app/services/chart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  usersPacient: User[] = [];

  private userPacient: User;
  private usersSubPacient: Subscription;

  prontuarios: Chart[] = [];
  private prontuariosSub: Subscription;

  private userNameIdEdt: String;
  isLoading = false;

  constructor(
    public userService: UserService,
    public router: ActivatedRoute,
    public chartService: ChartService,
  ) { }

  ngOnInit() {
    // this.userService.getUsersPacient();
    // this.usersSubPacient = this.userService.getUsersPacientUpdated()
    // .subscribe((usersPacient: User[]) => {
    //   this.usersPacient = usersPacient;
    // });

    this.getUsersCharts();

    // setTimeout(() => {
    //   this.getUsersCharts();
    //   console.log('carregado');

    // }, 2000)

    this.chartService.getCharts();
    this.prontuariosSub = this.chartService.getChartUpdated()
    .subscribe((prontuarios: Chart[]) => {
      this.prontuarios = prontuarios;
    })
  }

  getUsersCharts() {
    this.userService.getUsersPacient();
    this.usersSubPacient = this.userService.getUsersPacientUpdated()
    .subscribe((usersPacient: User[]) => {
      this.usersPacient = usersPacient;

      // this.usersPacient.forEach((res) => {
      //   this.userNameIdEdt = res.userName.slice(0, 1);
      //   console.log(this.userNameIdEdt);
      // })
    });
  }
}
