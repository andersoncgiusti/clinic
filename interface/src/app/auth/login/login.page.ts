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

  constructor(
    public authService: AuthService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    // this.isLoading = false;
  }

  onLogin(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.userEmail, form.value.password);

  }

  forgot() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/forgot');
    }, 2000)
  }
}
