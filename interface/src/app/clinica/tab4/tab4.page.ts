import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  eventSource = [];
  valueTotal: String;

  constructor() { }

  ngOnInit() {
  }

  package = {
    id: '6334ab53981b14a6d5babab3',
    name: 'Anderson',
    email: 'anderson.giusti12@gmail.com',
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
      id:       this.package.id,
      name:     this.package.name,
      email:    this.package.email,
      cpf:      this.package.cpf,
      sessions: this.package.sessions,
      value:    this.package.value,
      pay:      this.package.pay,
      total:    this.valueTotal,
    })

    this.eventSource = events;
    console.log(this.eventSource );
  }

}
