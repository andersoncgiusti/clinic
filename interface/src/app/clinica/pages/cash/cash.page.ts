import { Component, OnDestroy, OnInit } from '@angular/core';
import { CashService } from 'src/app/services/cash.service';
import { Cash } from 'src/app/models/cash.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.page.html',
  styleUrls: ['./cash.page.scss'],
})
export class CashPage implements OnInit, OnDestroy {
  cashs: Cash[] = [];
  private cashsSub: Subscription;
  isLoading = false;
  credit;
  debt;
  money;
  totalDay;
  totalMonth;
  totalDayValue;
  totalMonthValue;
  creditTotal;
  debtTotal;
  moneyTotal;
  creditTotalDay;
  debtTotalDay;
  moneyTotalDay;
  creditTotalMonth;
  debtTotalMonth;
  moneyTotalMonth;

  userIsAuthenticated = false;
  private authStatusSub!: Subscription;

  constructor(
    public cashService: CashService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.isLoading = true;
    this.cashService.getModule()
    .subscribe((data) => {
      this.credit = data.credit;
      this.debt = data.debt;
      this.money = data.money;
      this.totalDay = this.credit + this.debt + this.money;
      this.totalMonth = data.countMonth;
      this.creditTotal = data.creditTotal;
      this.debtTotal = data.debtTotal;
      this.moneyTotal = data.moneyTotal;
      this.creditTotalDay = data.cashsDayCredit;
      this.debtTotalDay = data.cashsDayDebt;
      this.moneyTotalDay = data.cashsDayMoney;
      this.creditTotalMonth = data.cashsMonthCredit;
      this.debtTotalMonth = data.cashsMonthDebt;
      this.moneyTotalMonth = data.cashsMonthMoney;
      this.totalDayValue = this.creditTotalDay + this.debtTotalDay + this.moneyTotalDay;
      this.totalMonthValue = this.creditTotalMonth + this.debtTotalMonth + this.moneyTotalMonth;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
