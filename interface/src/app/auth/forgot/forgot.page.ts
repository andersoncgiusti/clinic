import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  isLoading = false;

  constructor(
    public authService: AuthService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    // this.isLoading = true;
  }

  onForgot(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.forgot(form.value.userEmail);
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/reset');
    }, 2000)

  }

}
