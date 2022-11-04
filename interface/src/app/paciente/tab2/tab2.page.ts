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

  constructor(
    public chartService: ChartService,
  ) {}

  ngOnInit() {
    this.chartService.getCharts();
    this.prontuariosSub = this.chartService.getChartUpdated()
    .subscribe((prontuarios) => {
      this.prontuarios = prontuarios;

      const id = '6334ab53981b14a6d5babab3';

      const allcharts = [];

      this.prontuarios.forEach((res) => {
        if (res.userId === id) {
          allcharts.push({
            treatment: res.treatment
          })
        }
      });

      this.eventSource = allcharts;
    })
  }
}
