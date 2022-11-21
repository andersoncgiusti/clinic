import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cash } from 'src/app/models/cash.model';
import { Session } from 'src/app/models/session.model';
import { AuthService } from 'src/app/services/auth.service';
import { CashService } from 'src/app/services/cash.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-cash-details',
  templateUrl: './cash-details.page.html',
  styleUrls: ['./cash-details.page.scss'],
})
export class CashDetailsPage implements OnInit, OnDestroy {
  cashs: Cash[] = [];
  private cashsSub: Subscription;

  sessions: Session[] = [];
  private sessionsSub: Subscription;
  isLoading = false;
  credit;
  debt;
  money;
  saleDay;
  saleMonth;
  saleDayLength;
  saleMonthLength;

  userIsAuthenticated = false;
  private authStatusSub!: Subscription;

  constructor(
    public cashService: CashService,
    public sessionService: SessionService,
    private loadingCtrl: LoadingController,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.isLoading = true;
    // this.cashService.getCashs();
    // this.cashsSub = this.cashService.getCashUpdated()
    // .subscribe((cashs: Cash[]) => {
    //   console.log(cashs);
    //   this.cashs = cashs;
    // })

    this.getCashs();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  getCashs() {
    this.isLoading = true;
    this.cashService.getModule()
    .subscribe((data) => {
      this.saleDay = data.saleDay;
      this.saleMonth = data.saleMonth;
      this.saleDayLength = data.saleDay.length
      this.saleMonthLength = data.saleMonth.length;
      this.isLoading = false;
    });
  }

  onDelete(cashtId: String) {
    this.cashService.deleteCash(cashtId);
    this.showLoading();
    this.getCashs();
  }

  // onDelet(cashtId: String) {
  //   console.log(cashtId);

  //   this.sessionService.deleteSession(cashtId);
  // }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Salvando...',
      duration: 3000,
      cssClass: 'custom-loading',
    });
    loading.present();
  }

}
