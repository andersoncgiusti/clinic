import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cash } from 'src/app/models/cash.model';
import { User } from 'src/app/models/user.model';
import { CashService } from 'src/app/services/cash.service';
import { SessionService } from 'src/app/services/session.service';
import { TotalService } from 'src/app/services/total.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  eventSource = [];
  eventSources = [];
  eventSourcess = [];
  valueTotal: String;
  valueTotalFormated: String;
  isLoading = false;
  sessions;
  value;

  private user: User;
  private usersSub: Subscription;
  users: User[] = [];

  cashs: Cash[] = [];
  private cashsSub: Subscription;

  sessionss = [];
  private sessionsSub: Subscription;

  constructor(
    public cashService: CashService,
    public userService: UserService,
    public sessionService: SessionService,
    public totalService: TotalService,
    private loadingCtrl: LoadingController,
    ) { }

  ngOnInit() {
    this.isLoading = true;

    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdated()
    .subscribe((users: User[]) => {
      this.users = users;

      const allPatient = [];

      this.users.filter((resp) => {
        if (resp.userPermission === 'paciente') {
          allPatient.push({
            user: resp
          })
        }
      })
      this.eventSourcess = allPatient;
      this.isLoading = false;
    });

    // this.cashService.getCashs();
    // this.cashsSub = this.cashService.getCashUpdated()
    // .subscribe((cashs: Cash[]) => {
    //   console.log(cashs);
    //   this.cashs = cashs;
    //   this.isLoading = false;
    // })

    // this.sessionService.getSession();
    // this.sessionsSub = this.sessionService.getSessionUpdated()
    // .subscribe((sessions) => {
    //   this.sessions = sessions;
    //   // console.log(this.sessions);

    //   const allSession = [];

    //   this.sessions.filter((resp) => {
    //     console.log(resp);

    //     if (resp.sessionPatient === null) {

    //       allSession.push({
    //         session: resp
    //       })
    //     }
    //   })
    //   this.eventSources = allSession;
    //   console.log(this.eventSources);
    //   this.isLoading = false;
    // })
  }

  package = {
    user: '',
    sessions: Number,
    value: Number,
    pay: '',
    total: '',
  }

  sales() {
    const events = [];
    const total = [];
    const session = (this.package.sessions).toString();
    const val = (this.package.value).toString();

    this.valueTotal = eval(session + '*' + val);

    events.push({
      user:     this.package.user,
      sessions: this.package.sessions,
      value:    this.package.value,
      pay:      this.package.pay,
      total:    this.valueTotal,
    })

    this.cashService.addCash(
      this.package.sessions.toString(),
      this.package.value.toString(),
      this.package.pay,
      this.valueTotal,
      this.package.user,
    )

    total.push({
      sessions: this.package.sessions,
      user:     this.package.user,
    })

    this.sessionService.addSessionStart(
      this.package.sessions.toString(),
      this.package.user,
    )

    this.eventSource = events;
    this.eventSourcess = total;
    this.showLoading();

    setTimeout(() => {
      this.sessionRefresh();
    }, 1000);
  }

  calcSale() {
    const session = (this.package.sessions).toString();
    const val = (this.package.value).toString();
    this.valueTotalFormated = eval(session + '*' + val);
  }

  clearCash() {
    this.sessions = this.package.sessions.toString();
    this.value = this.package.value.toString();

    setTimeout(()=> {
      this.package.pay = ''
      this.valueTotal = ''
      this.package.user = ''
      this.sessions = ''
      this.value = ''
    }, 1000);
  }

  packageQte = {
    userName: '',
    sessionPatient: Number,
    user: '',
  }

  session() {
    // this.isLoading = true;
    // const events = [];

    // this.userService.getUsers();
    // this.usersSub = this.userService.getUsersUpdated()
    // .subscribe((users: User[]) => {
    //   this.users = users;

    //   this.users.filter((resp) => {
    //     if (resp.id === this.packageQte.user) {
    //       events.push({
    //         sessionsPatient: this.packageQte.sessionPatient.toString(),
    //         user: this.packageQte.user,
    //         userName: resp.userName,
    //       })

    //       this.sessionService.addSession(
    //         this.packageQte.sessionPatient.toString(),
    //         this.packageQte.user,
    //         this.packageQte.userName + resp.userName,
    //       )
    //     }
    //     this.eventSource = events[0];
    //     console.log(this.eventSource);

        // this.isLoading = false;
    //   })
    // });
  }

  packageTotal = {
    // userName: '',
    sessionPatient: Number,
    user: '',
  }

  total() {
    // const events = [];

    // events.push({
    //   sessionsPatient: this.packageTotal.sessionPatient.toString(),
    //   user           : this.packageTotal.user,
    //   // userName       : this.packageTotal.userName,
    // })

    // this.sessionService.addSessionStart(
    //   this.packageTotal.sessionPatient.toString(),
    //   this.packageTotal.user,
    //   // this.packageTotal.userName,
    // )

    // this.eventSource = events;
    // console.log(this.eventSource);

  }

  packageStart = {
    user: ''
  }

  start() {
    // setTimeout(() => {

    //   const events = [];

    //   events.push({
    //     user: this.packageStart.user
    //   })

    //   // this.sessionService.addSessionStart(
    //   //   this.packageStart.user
    //   // )

    //   // this.totalService.addTotalized(
    //   //   this.packageStart.user
    //   // )

    //   this.eventSource = events;

    // }, 1000)
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Salvando...',
      duration: 2000,
      cssClass: 'custom-loading',
    });
    loading.present();
  }

  sessionRefresh() {
    this.sessionService.getSession();
    this.sessionsSub = this.sessionService.getSessionUpdated()
    .subscribe((sessions) => {
      this.sessions = sessions;
    })
  }
}
