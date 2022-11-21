import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cash } from 'src/app/models/cash.model';
import { AuthService } from 'src/app/services/auth.service';
import { CashService } from 'src/app/services/cash.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
  eventSource = [];

  cashs = [];
  private cashsSub: Subscription;

  isLoading = false;

  cashsId = [];

  userIsAuthenticated = false;
  private authStatusSub!: Subscription;

  constructor(
    public cashService: CashService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.isLoading = true;

    this.cashService.getCashs();
    this.cashsSub = this.cashService.getCashUpdated()
    .subscribe((cashs) => {
      this.cashs = cashs;

      const user = localStorage.getItem('user');
      const id = user;

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

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
