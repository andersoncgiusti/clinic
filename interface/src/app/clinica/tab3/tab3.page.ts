import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AnimationController, LoadingController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  paciente = false;
  admin = false;
  fisio = false;
  upTitle =  false;
  isList = false;
  isLoading = false;
  detail = '';
  users: User[] = [];
  eventSource = [];
  nameTilte;
  private userId: String;
  private user: User;
  private usersSub: Subscription;
  public id = '';
  public userName = '';
  public userLastName = '';
  public userBirth = '';
  public userPhone = '';
  public userEmail = '';
  public userCpf = '';
  public userAddress = '';
  public userNumber = '';
  public userComplement = '';
  public userCity = '';
  public userState = '';
  public userPermission = '';
  public password = '';

  constructor(
    private animationCtrl: AnimationController,
    public userService: UserService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
    ) {}

  ngOnInit() {
    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdated()
    .subscribe((users: User[]) => {
      this.users = users;
      // this.users.forEach(resp => {
      //   this.nameTilte = resp.userName;
      // })
    });
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdated()
    .subscribe((users: User[]) => {
      this.users = users;
      // this.users.forEach(resp => {
      //   this.nameTilte = resp.userName;
      // })
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 3000,
      cssClass: 'custom-loading',
    });
    loading.present();
  }

  onDelete(userId: String) {
    this.userService.deleteUser(userId);
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }

  cliente() {
    this.paciente = !this.paciente;
    this.admin = false;
    this.fisio = false;
  }

  administrador() {
    this.admin = !this.admin;
    this.paciente = false;
    this.fisio = false;
  }

  fisioterapeuta() {
    this.fisio = !this.fisio;
    this.paciente = false;
    this.admin = false;
  }

  up() {
    this.upTitle = !this.upTitle;
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  details(id) {
    this.detail = this.detail == id ? '':id;
    this.upTitle = false;
  }

  detailsBack() {
    location.reload();
    this.showLoading;
  }

  pacienteEvent = {
    // id: '',
    userName: '',
    userLastName: '',
    userBirth: '',
    userPhone: '',
    userEmail: '',
    userCpf: '',
    userAddress: '',
    userNumber: '',
    userComplement: '',
    userCity: '',
    userState: '',
    userPermission: 'paciente',
    password: ''
  };

  createPaciente() {
    const pacientes = [];

    pacientes.push({
      userName: this.pacienteEvent.userName,
      userLastName: this.pacienteEvent.userLastName,
      userBirth: this.pacienteEvent.userBirth,
      userPhone: this.pacienteEvent.userPhone,
      userEmail: this.pacienteEvent.userEmail,
      userCpf: this.pacienteEvent.userCpf,
      userAddress: this.pacienteEvent.userAddress,
      userNumber: this.pacienteEvent.userNumber,
      userComplement: this.pacienteEvent.userComplement,
      userCity: this.pacienteEvent.userCity,
      userState: this.pacienteEvent.userState,
      userPermission: this.pacienteEvent.userPermission,
      password: this.pacienteEvent.password,
    });

    this.userService.addUser(
      this.pacienteEvent.userName,
      this.pacienteEvent.userLastName,
      this.pacienteEvent.userBirth,
      this.pacienteEvent.userPhone,
      this.pacienteEvent.userEmail,
      this.pacienteEvent.userCpf,
      this.pacienteEvent.userAddress,
      this.pacienteEvent.userNumber,
      this.pacienteEvent.userComplement,
      this.pacienteEvent.userCity,
      this.pacienteEvent.userState,
      this.pacienteEvent.userPermission,
      this.pacienteEvent.password
    );

    this.eventSource = pacientes;
    console.log(pacientes);
  }

  adminEvent = {
    // id: '',
    userName: '',
    userLastName: '',
    userBirth: '',
    userPhone: '',
    userEmail: '',
    userCpf: '',
    userAddress: '',
    userNumber: '',
    userComplement: '',
    userCity: '',
    userState: '',
    userPermission: 'administrador',
    password: ''
  };

  createAdmin() {
    const admins = [];

    admins.push({
      userName: this.adminEvent.userName,
      userLastName: this.adminEvent.userLastName,
      userBirth: this.adminEvent.userBirth,
      userPhone: this.adminEvent.userPhone,
      userEmail: this.adminEvent.userEmail,
      userCpf: this.adminEvent.userCpf,
      userAddress: this.adminEvent.userAddress,
      userNumber: this.adminEvent.userNumber,
      userComplement: this.adminEvent.userComplement,
      userCity: this.adminEvent.userCity,
      userState: this.adminEvent.userState,
      userPermission: this.adminEvent.userPermission,
      password: this.adminEvent.password,
    });

    this.userService.addUser(
      this.adminEvent.userName,
      this.adminEvent.userLastName,
      this.adminEvent.userBirth,
      this.adminEvent.userPhone,
      this.adminEvent.userEmail,
      this.adminEvent.userCpf,
      this.adminEvent.userAddress,
      this.adminEvent.userNumber,
      this.adminEvent.userComplement,
      this.adminEvent.userCity,
      this.adminEvent.userState,
      this.adminEvent.userPermission,
      this.adminEvent.password
    );

    this.eventSource = admins;
    console.log(admins);

  }

  fisioEvent = {
    // id: '',
    userName: '',
    userLastName: '',
    userBirth: '',
    userPhone: '',
    userEmail: '',
    userCpf: '',
    userAddress: '',
    userNumber: '',
    userComplement: '',
    userCity: '',
    userState: '',
    userPermission: 'fisioterapeuta',
    password: ''
  };

  createFisio() {
    const fisios = [];

    fisios.push({
      userName: this.fisioEvent.userName,
      userLastName: this.fisioEvent.userLastName,
      userBirth: this.fisioEvent.userBirth,
      userPhone: this.fisioEvent.userPhone,
      userEmail: this.fisioEvent.userEmail,
      userCpf: this.fisioEvent.userCpf,
      userAddress: this.fisioEvent.userAddress,
      userNumber: this.fisioEvent.userNumber,
      userComplement: this.fisioEvent.userComplement,
      userCity: this.fisioEvent.userCity,
      userState: this.fisioEvent.userState,
      userPermission: this.fisioEvent.userPermission,
      password: this.fisioEvent.password,
    });

    this.userService.addUser(
      this.fisioEvent.userName,
      this.fisioEvent.userLastName,
      this.fisioEvent.userBirth,
      this.fisioEvent.userPhone,
      this.fisioEvent.userEmail,
      this.fisioEvent.userCpf,
      this.fisioEvent.userAddress,
      this.fisioEvent.userNumber,
      this.fisioEvent.userComplement,
      this.fisioEvent.userCity,
      this.fisioEvent.userState,
      this.fisioEvent.userPermission,
      this.fisioEvent.password
    );

    this.eventSource = fisios;
    console.log(fisios);
  }

  backList() {
    console.log('hello word');
    this.isList = !this.isList;
  }

  ngSubmit(frm: any) {
    if (frm.invalid) {
      return;
    }

    this.userService.updateUser(
      frm.value.id,
      frm.value.userName,
      frm.value.userLastName,
      frm.value.userBirth,
      frm.value.userPhone,
      frm.value.userEmail,
      frm.value.userCpf,
      frm.value.userAddress ,
      frm.value.userNumber,
      frm.value.userComplement,
      frm.value.userCity,
      frm.value.userState,
      frm.value.userPermission,
      frm.value.password
    )
  }

  clearPaciente() {
    setTimeout(()=> {
      // this.pacienteEvent.id: '',
      this.pacienteEvent.userName = '',
      this.pacienteEvent.userLastName = ''
      this.pacienteEvent.userBirth = ''
      this.pacienteEvent.userPhone = ''
      this.pacienteEvent.userEmail = ''
      this.pacienteEvent.userCpf = ''
      this.pacienteEvent.userAddress = ''
      this.pacienteEvent.userNumber = ''
      this.pacienteEvent.userComplement = ''
      this.pacienteEvent.userCity = ''
      this.pacienteEvent.userState = ''
      this.pacienteEvent.userPermission = ''
    }, 1000)
  }

  clearAdmin() {
    setTimeout(()=> {
      // this.adminEvent.id: '',
      this.adminEvent.userName = '',
      this.adminEvent.userLastName = ''
      this.adminEvent.userBirth = ''
      this.adminEvent.userPhone = ''
      this.adminEvent.userEmail = ''
      this.adminEvent.userCpf = ''
      this.adminEvent.userAddress = ''
      this.adminEvent.userNumber = ''
      this.adminEvent.userComplement = ''
      this.adminEvent.userCity = ''
      this.adminEvent.userState = ''
      this.adminEvent.userPermission = ''
    }, 1000)
  }

  clearFisio() {
    setTimeout(()=> {
      // this.fisioEvent.id: '',
      this.fisioEvent.userName = '',
      this.fisioEvent.userLastName = ''
      this.fisioEvent.userBirth = ''
      this.fisioEvent.userPhone = ''
      this.fisioEvent.userEmail = ''
      this.fisioEvent.userCpf = ''
      this.fisioEvent.userAddress = ''
      this.fisioEvent.userNumber = ''
      this.fisioEvent.userComplement = ''
      this.fisioEvent.userCity = ''
      this.fisioEvent.userState = ''
      this.fisioEvent.userPermission = ''
    }, 1000)
  }
}
