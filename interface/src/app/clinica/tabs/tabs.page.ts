import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Scheduling } from 'src/app/models/scheduling.model';
import { AuthService } from 'src/app/services/auth.service';
import { SchedulingService } from 'src/app/services/scheduling.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {

  agendamentos: Scheduling[] = [];
  private agendamentosSub: Subscription;

  userIsAuthenticated = false;
  private authStatusSub!: Subscription;

  schedulingDay;
  isLoading = false;

  constructor(
    public schedulingService: SchedulingService,
    public authService: AuthService
    ) {}

  ngOnInit() {
    // this.schedulingService.getAgendamentos()
    // this.agendamentosSub = this.schedulingService.getAgendamentosUpdated()
    // .subscribe((agendamentos: Scheduling[]) => {
    //   this.agendamentos = agendamentos;
    // })

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

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

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
