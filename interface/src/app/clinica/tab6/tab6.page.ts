import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {

  isLoading = false;

  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    // this.isLoading = true;
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 1000);
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
