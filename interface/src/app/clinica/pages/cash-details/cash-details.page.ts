import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cash } from 'src/app/models/cash.model';
import { CashService } from 'src/app/services/cash.service';

@Component({
  selector: 'app-cash-details',
  templateUrl: './cash-details.page.html',
  styleUrls: ['./cash-details.page.scss'],
})
export class CashDetailsPage implements OnInit {
  cashs: Cash[] = [];
  private cashsSub: Subscription;

  credit;
  debt;
  money;
  saleDay;
  saleMonth;
  saleDayLength;
  saleMonthLength;
  constructor(public cashService: CashService) { }

  ngOnInit() {
    // this.cashService.getCashs;
    // this.cashsSub = this.cashService.getCashUpdated()
    // .subscribe((cashs: Cash[]) => {
    //   console.log(cashs);
    //   this.cashs = cashs;
    // })

    this.getCashs();
  }

  getCashs() {
    this.cashService.getModule()
    .subscribe((data) => {
      console.log(data)
      this.saleDay = data.saleDay;
      this.saleMonth = data.saleMonth;
      this.saleDayLength = data.saleDay.length
      this.saleMonthLength = data.saleMonth.length;
    });
  }

  onDelete(cashtId: String) {
    this.cashService.deleteCash(cashtId);
    setTimeout(() => {
      this.getCashs();
    }, 1000);
  }
}
