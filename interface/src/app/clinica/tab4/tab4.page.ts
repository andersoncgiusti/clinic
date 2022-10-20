import { Component, OnInit } from '@angular/core';
import { CashService } from 'src/app/services/cash.service';

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

  constructor(public cashService: CashService) { }

  ngOnInit() {
  }

  package = {
    user: '634ded7b4368bde290802a35',
    // name: 'Anderson',
    // email: 'anderson.giusti12@gmail.com',
    cpf: '',
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
      // name:     this.package.name,
      // email:    this.package.email,
      // cpf:      this.package.cpf,
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
      this.package.cpf = ''
      this.package.pay = ''
      this.valueTotal = ''
      this.package.user = ''
      this.sessions = ''
      this.value = ''
    }, 1000);
  }

}
