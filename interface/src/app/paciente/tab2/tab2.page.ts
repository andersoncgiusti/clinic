import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart } from 'src/app/models/chart.model';
import { AuthService } from 'src/app/services/auth.service';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  eventSource = [];
  prontuarios = [];

  private prontuariosSub: Subscription;

  isLoading = false;

  userIsAuthenticated = false;
  private authStatusSub!: Subscription;

  constructor(
    public chartService: ChartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.isLoading = true;

    this.chartService.getCharts();
    this.prontuariosSub = this.chartService.getChartUpdated()
    .subscribe((prontuarios) => {
      this.prontuarios = prontuarios;

      const user = localStorage.getItem('user');
      const id = user;

      const allcharts = [];

      this.prontuarios.forEach((res) => {
        if (res.userId === id) {
          allcharts.push({
            treatment: res.treatment
          })
        }
      });

      this.eventSource = allcharts;
      this.isLoading = false;
    })
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
