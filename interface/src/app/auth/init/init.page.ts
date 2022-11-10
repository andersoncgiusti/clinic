import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-init',
  templateUrl: './init.page.html',
  styleUrls: ['./init.page.scss'],
})
export class InitPage implements OnInit {

  isLoading = false;

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.isLoading = false;
    setTimeout(() => {
      this.isLoading = true;
      setTimeout(() => {
        this.navCtrl.navigateRoot('login');
      }, 5000)
    }, 3000)
  }

}
