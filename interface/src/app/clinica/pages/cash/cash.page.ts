import { Component, OnInit } from '@angular/core';
import { CashService } from 'src/app/services/cash.service';
import { Cash } from 'src/app/models/cash.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.page.html',
  styleUrls: ['./cash.page.scss'],
})
export class CashPage implements OnInit {
  cashs: Cash[] = [];
  private cashsSub: Subscription;

  credit;
  debt;
  money;
  totalDay;
  totalMonth;
  creditTotal;
  debtTotal;
  moneyTotal;

  constructor(public cashService: CashService) { }

  ngOnInit() {
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
    });
  }

}
