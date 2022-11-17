import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cash } from 'src/app/models/cash.model';
import { CashService } from 'src/app/services/cash.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  eventSource = [];
  cashs = [];
  private cashsSub: Subscription;
  isLoading = false;
  cashsId = [];

  constructor(
    public cashService: CashService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.cashService.getCashs();
    this.cashsSub = this.cashService.getCashUpdated()
    .subscribe((cashs) => {
      this.cashs = cashs;

      const id = '6356ea69ab8e3e2745ca8ef3';

      const allcashs = [];

      this.cashs.forEach((res) => {

        if (res.user === id) {
          this.cashsId = res;
          allcashs.push({
            pay: res.pay,
            sessions: res.sessions,
            value: res.value,
            total: res.total,
            created: res.created
          })
        }
      })

      this.eventSource = allcashs;
      this.isLoading = false;
    })
  }
}
