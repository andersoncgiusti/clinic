import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { CashService } from 'src/app/services/cash.service';
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

  sessions;
  value;

  private user: User;
  private usersSub: Subscription;
  users: User[] = [];

  constructor(
    public cashService: CashService,
    public userService: UserService,
    ) { }

  ngOnInit() {
    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdated()
    .subscribe((users: User[]) => {
      this.users = users;
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
      user:       this.package.user,
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
    console.log('this.eventSource', this.eventSource);
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
}
