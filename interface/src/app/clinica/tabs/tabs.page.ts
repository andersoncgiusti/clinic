import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Scheduling } from 'src/app/models/scheduling.model';
import { SchedulingService } from 'src/app/services/scheduling.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  agendamentos: Scheduling[] = [];
  private agendamentosSub: Subscription;
  schedulingDay;

  constructor(public schedulingService: SchedulingService) {}

  ngOnInit() {
    // this.schedulingService.getAgendamentos()
    // this.agendamentosSub = this.schedulingService.getAgendamentosUpdated()
    // .subscribe((agendamentos: Scheduling[]) => {
    //   this.agendamentos = agendamentos;
    // })

    this.schedulingService.getAgendamentosDay()
    .subscribe((data) => {
      this.schedulingDay = data.agendamentoDay;
    });

    setInterval(() => {
      this.schedulingService.getAgendamentosDay()
      .subscribe((data) => {
        this.schedulingDay = data.agendamentoDay;
      })
    }, 60000);
  }
}
