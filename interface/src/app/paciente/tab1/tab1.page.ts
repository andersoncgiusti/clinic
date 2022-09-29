import { Component, OnInit, ViewChild } from '@angular/core';
import { CheckboxCustomEvent, IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { CalendarComponent } from 'ionic2-calendar';
import { CalModalPage } from '../pages/cal-modal/cal-modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  eventSource = [];
  viewTitle: string;
  showAddEvent: boolean;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  newEvent: any = {
    title: '',
    // description: '',
    startTime: '',
    endTime: '',
    allDay: false
  }

  myData = [
    {
      title: 'Anderson',
      startTime: new Date("2022-09-28T16:00:00-03:00"),
      endTime: new Date("2022-09-28T17:00:00-03:00"),
      allDay: false,
    },
    {
      title: 'Ana',
      startTime: new Date("2022-09-29T18:00:00-03:00"),
      endTime: new Date("2022-09-29T19:00:00-03:00"),
      allDay: false,
    }
  ];

  selectedDate: Date;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.eventSource = this.myData;
  }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(ev) {
    this.newEvent = ev;
  }

  showHideForm() {
    this.showAddEvent = !this.showAddEvent;
  }

  // createRandomEvents() {
  //   var events = [];
  //   for (var i = 0; i < 50; i += 1) {
  //     var date = new Date();
  //     var eventType = Math.floor(Math.random() * 2);
  //     var startDay = Math.floor(Math.random() * 90) - 45;
  //     var endDay = Math.floor(Math.random() * 2) + startDay;
  //     var startTime;
  //     var endTime;
  //     if (eventType === 0) {
  //       startTime = new Date(
  //         Date.UTC(
  //           date.getUTCFullYear(),
  //           date.getUTCMonth(),
  //           date.getUTCDate() + startDay
  //         )
  //       );
  //       if (endDay === startDay) {
  //         endDay += 1;
  //       }
  //       endTime = new Date(
  //         Date.UTC(
  //           date.getUTCFullYear(),
  //           date.getUTCMonth(),
  //           date.getUTCDate() + endDay
  //         )
  //       );
  //       events.push({
  //         title: 'All Day - ' + i,
  //         startTime: startTime,
  //         endTime: endTime,
  //         allDay: true,
  //       });
  //     } else {
  //       var startMinute = Math.floor(Math.random() * 24 * 60);
  //       var endMinute = Math.floor(Math.random() * 180) + startMinute;
  //       startTime = new Date(
  //         date.getFullYear(),
  //         date.getMonth(),
  //         date.getDate() + startDay,
  //         0,
  //         date.getMinutes() + startMinute
  //       );
  //       endTime = new Date(
  //         date.getFullYear(),
  //         date.getMonth(),
  //         date.getDate() + endDay,
  //         0,
  //         date.getMinutes() + endMinute
  //       );
  //       events.push({
  //         title: 'Event - ' + i,
  //         startTime: startTime,
  //         endTime: endTime,
  //         allDay: false,
  //       });
  //     }
  //   }
  //   this.eventSource = events;
  // }

  // createRandomEvents() {
  //   const events = [];
  //   const date = new Date();
  //   console.log(date);

  //   const startTime = new Date("2022-09-02T16:30:00-03:00");
  //   console.log('startTime', startTime);

  //   const endTime = new Date("2022-09-02T18:30:00-03:00");
  //   console.log('endTime', endTime);

  //   events.push({
  //     title: 'Anderson Carvalho Giusti',
  //     startTime: startTime,
  //     endTime: endTime,
  //     allDay: false,
  //   })
  //   this.eventSource = events;

    // events.push({
    //   title: 'Ana Paula Lins e Silva',
    //   startTime: startTime,
    //   endTime: endTime,
    //   allDay: false,
    // })
    // this.eventSource = events;
  // }

  event = {
    title: '',
    desc: '',
    startTime: null,
    day: null,
    month: null,
    endTime: null,
    allDay: false
  };

  createEvents() {
    const events = [];
    const date = new Date();

    const year = date.getFullYear();
    const month = this.event.month;
    const day = this.event.day;

    this.modalCtrl.dismiss({event: this.event});
    const result = year + "-" + month + "-" + day;

    const start = parseInt(this.event.startTime);
    const end = eval(start + '+' + this.event.endTime);
    const concat = '0' + end;
    const formated = concat.slice(concat.length - 2);

    const startTime = new Date(""+`${result}`+"T"+`${this.event.startTime}`+""+":00:00-03:00");
    const endTime = new Date(""+`${result}`+"T"+`${formated}`+""+":00:00-03:00");

    events.push({
      title: this.event.title,
      desc: this.event.desc,
      startTime: startTime,
      endTime: endTime,
      allDay: false,
    })
    this.eventSource = events;

    // events.push({
    //   title: 'Ana Paula Lins e Silva',
    //   startTime: startTime,
    //   endTime: endTime,
    //   allDay: false,
    // })
    // this.eventSource = events;
  }

  removeEvents() {
    this.eventSource = [];
  }

  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });

    await modal.present();

    // modal.onDidDismiss().then((result) => {
    //   if (result.data && result.data.event) {
    //     let event = result.data.event;
    //     if (event.allDay) {
    //       let start = event.startTime;
    //       event.startTime = new Date(
    //         Date.UTC(
    //           start.getUTCFullYear(),
    //           start.getUTCMonth(),
    //           start.getUTCDate()
    //         )
    //       );
    //       event.endTime = new Date(
    //         Date.UTC(
    //           start.getUTCFullYear(),
    //           start.getUTCMonth(),
    //           start.getUTCDate() + 1
    //         )
    //       );
    //     }
    //     this.eventSource.push(result.data.event);
    //     this.myCal.loadEvents();
    //   }
    // });

    modal.onDidDismiss().then((result) => {

      const data      = new Date();
      const hora      = data.getHours();
      const min       = data.getMinutes();
      const str_hora  = hora + ':' + min;
      const event     = result.data.event;
      const day       = result.data.event.startTime.toISOString().slice(0, 10);

      // event.startTime = new Date(""+`${day}`+"T"+`${str_hora}`+""+":00-03:00");
      // event.endTime   = new Date(""+`${day}`+"T"+`${hora + 1}`+""+":00-03:00");

      event.startTime = new Date(""+`${day}`+"");
      event.endTime   = new Date(""+`${day}`+"");

      this.eventSource.push(result.data.event);
      this.myCal.loadEvents();
    });
  }
}
