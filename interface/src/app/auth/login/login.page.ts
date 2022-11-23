import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading = false;
  message = false;

  constructor(
    public authService: AuthService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    // this.isLoading = false;
  }

  onLogin(form: NgForm) {
    // console.log(form.value);
    if (form.invalid) {
      this.navCtrl.navigateRoot('/login');
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.userEmail, form.value.password);

  }

  forgot() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/forgot');
    }, 2000)
  }

  error() {
    this.message = false;
    setTimeout(() => {
      this.message = true;
      this.isLoading = false;
    }, 20000)
  }
}
