import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit, OnDestroy {

  isLoading = false;

  userIsAuthenticated = false;
  private authStatusSub!: Subscription;

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    // this.isLoading = true;
  }

  onLogout() {
    this.authService.logout();
    localStorage.clear();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
