import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chart } from 'src/app/models/chart.model';
import { User } from 'src/app/models/user.model';
import { ChartService } from 'src/app/services/chart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  usersPacient: User[] = [];
  private userPacient: User;
  private usersSubPacient: Subscription;
  prontuarios: Chart[] = [];
  private prontuariosSub: Subscription;
  isLoading = false;

  constructor(
    public userService: UserService,
    public router: ActivatedRoute,
    public chartService: ChartService,
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.getUsersCharts();
    this.getUsers();
  }

  getUsersCharts() {
    this.isLoading = true;

    this.chartService.getCharts();
    this.prontuariosSub = this.chartService.getChartUpdated()
    .subscribe((prontuarios) => {
      this.prontuarios = prontuarios;
      this.isLoading = false;
    })
  }

  getUsers() {
    this.isLoading = true;

    this.userService.getUsersPacient();
    this.usersSubPacient = this.userService.getUsersPacientUpdated()
    .subscribe((usersPacient) => {
      this.usersPacient = usersPacient;
      this.isLoading = false;
    });
  }
}
