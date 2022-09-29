import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements OnInit {

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  viewTitle: string;

  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: null,
    allDay: false
  };

  modalReady = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    setTimeout(() => {
      this.modalReady = true;
    }, 1000);
  }

  save() {
    this.modalCtrl.dismiss({event: this.event});

    console.log('------------------------------ this.event', this.event);
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    // toISOString().slice(0, 10);
    const start = ev.selectedTime.toISOString().slice(0, 10);
    // this.event.startTime = new Date(start);
    // this.event.endTime = new Date(start);

    this.event.startTime = start;
    this.event.endTime = start;

    // this.event.endTime = new Date(ev.selectedTime);
    console.log('ev.selectedTime', ev.selectedTime.toISOString().slice(0, 10));
  }

  close() {
    this.modalCtrl.dismiss(null, 'close');
  }
}
