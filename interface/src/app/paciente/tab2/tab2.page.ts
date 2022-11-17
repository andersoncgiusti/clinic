import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart } from 'src/app/models/chart.model';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  eventSource = [];
  prontuarios = [];
  private prontuariosSub: Subscription;
  // charts;
  isLoading = false;

  constructor(
    public chartService: ChartService,
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.chartService.getCharts();
    this.prontuariosSub = this.chartService.getChartUpdated()
    .subscribe((prontuarios) => {
      this.prontuarios = prontuarios;

      const id = '6356ea69ab8e3e2745ca8ef3';

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
}
