import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
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
  valueTotal: String;
  valueTotalFormated: String;
  isLoading = false;
  sessions;
  value;

  private user: User;
  private usersSub: Subscription;
  users: User[] = [];

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
      this.isLoading = false;
    });
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

    this.eventSource = events;
    this.showLoading();
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
    sessionPatient: Number,
    user: '',
  }

  session() {
    const events = [];

    events.push({
      user: this.packageQte.user,
      sessionsPatient: this.packageQte.sessionPatient.toString()
    })

    this.sessionService.addSession(
      this.packageQte.sessionPatient.toString(),
      this.packageQte.user,
    )

    this.eventSource = events;
  }

  packageTotal = {
    sessionPatient: Number,
    user: '',
  }

  total() {
    const events = [];

    events.push({
      user: this.packageTotal.user,
      sessionsPatient: this.packageTotal.sessionPatient.toString()
    })

    this.totalService.addTotal(
      this.packageTotal.sessionPatient.toString(),
      this.packageTotal.user,
    )

    this.eventSource = events;
  }

  packageStart = {
    user: ''
  }

  start() {
    setTimeout(() => {

      const events = [];

      events.push({
        user: this.packageStart.user
      })

      this.sessionService.addSessionStart(
        this.packageStart.user
      )

      this.totalService.addTotalized(
        this.packageStart.user
      )

      this.eventSource = events;

    }, 1000)
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
