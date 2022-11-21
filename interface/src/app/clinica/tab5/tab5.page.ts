import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chart } from 'src/app/models/chart.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ChartService } from 'src/app/services/chart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit, OnDestroy {

  usersPacient: User[] = [];

  private userPacient: User;
  private usersSubPacient: Subscription;

  prontuarios: Chart[] = [];
  private prontuariosSub: Subscription;

  private userNameIdEdt: String;
  isLoading = false;

  userIsAuthenticated = false;
  private authStatusSub!: Subscription;

  constructor(
    public userService: UserService,
    public router: ActivatedRoute,
    public chartService: ChartService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.isLoading = true;
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
      this.isLoading = false;
    })
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  getUsersCharts() {
    this.isLoading = true;
    this.userService.getUsersPacient();
    this.usersSubPacient = this.userService.getUsersPacientUpdated()
    .subscribe((usersPacient: User[]) => {
      this.usersPacient = usersPacient;
      this.isLoading = false;
      // this.usersPacient.forEach((res) => {
      //   this.userNameIdEdt = res.userName.slice(0, 1);
      //   console.log(this.userNameIdEdt);
      // })
    });
  }
}
