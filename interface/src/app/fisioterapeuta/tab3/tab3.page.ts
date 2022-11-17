import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  isLoading = false;

  constructor(private loadingCtrl: LoadingController) {}

  ngOnInit() {
    // this.isLoading = true;

  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Salvando...',
      duration: 2000,
      cssClass: 'custom-loading',
    });
    loading.present();
  }

}
