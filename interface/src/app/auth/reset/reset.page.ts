import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  isLoading = false;

  constructor(
    public authService: AuthService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    // this.isLoading = true;
  }

  onReset(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.reset(form.value.userEmail, form.value.token, form.value.password);

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/login');
    }, 2000)

  }

}
