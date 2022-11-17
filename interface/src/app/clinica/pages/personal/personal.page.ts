import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {
  users: User[] = [];
  usersId;
  user;
  isLoading = false;
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
  public userPassword = '';

  private mode = '';

  private userId: String;
  private userPermissionId: String;
  private userNameId: String;
  private userNameIdEdt: String;
  private userLastNameId: String;
  private userBirthId: any;
  private userBirthIdSlice: any;
  private userPhoneId: any;
  private userEmailId: String;
  private userCpfId: any;
  private userCpfIdSlice: any;
  private userAddressId: String;
  private userNumberId: String;
  private userComplementId: String;
  private userCityId: String;
  private userStateId: String;
  private userPasswordId: String;
  private cpf: any;
  private phone: any;
  private birth: any;

  constructor(
    public userService: UserService,
    private navCtrl: NavController,
    public router: ActivatedRoute,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdated()
    .subscribe((users: User[]) => {
      this.users = users;
      const user = localStorage.getItem('user');
      const id = user;
      this.users.map((res) => {
        if (res.id === id) {
          this.usersId = res.id;
          this.userPermissionId = res.userPermission;
          this.userNameId = res.userName;
          this.userNameIdEdt = this.userNameId.slice(0, 1);
          this.userLastNameId = res.userLastName;
          this.userBirthIdSlice = res.userBirth;
          this.userBirthId = res.userBirth.replace(/[^0-9]/g, "").replace(/^([\d]{2})([\d]{2})?([\d]{4})?/, "$1/$2/$3");
          this.birth = this.userBirthId;
          this.userPhoneId = res.userPhone;
          this.userEmailId = res.userEmail;
          this.userCpfIdSlice = res.userCpf;
          this.userCpfId = res.userCpf.replace(/[^0-9]/g, "").replace(/^([\d]{3})([\d]{3})?([\d]{3})?([\d]{2})?/, "$1.$2.$3-$4");
          this.cpf = this.userCpfId;
          this.userAddressId = res.userAddress;
          this.userNumberId = res.userNumber;
          this.userComplementId = res.userComplement;
          this.userCityId = res.userCity;
          this.userStateId = res.userState;
          this.userPasswordId = res.password;

          const phone = this.userPhoneId;
          this.isLoading = false;
          if (phone.length === 11) {
            return this.phone = phone.replace(/[^0-9]/g, "").replace(/^([\d]{2})([\d]{5})?([\d]{4})?/, "($1) $2-$3");
          } else {
            return this.phone = phone.replace(/[^0-9]/g, "").replace(/^([\d]{2})([\d]{4})?([\d]{4})?/, "($1) $2-$3");
          }
        }
      })
    });
  }

  ngSubmit(frm: any) {
    if (frm.invalid) {
      return;
    }
    console.log(frm.value);

    this.userService.updateUser(
      frm.value.id,
      frm.value.userName,
      frm.value.userLastName,
      frm.value.userBirth.replace(/[^\d]+/g,''),
      frm.value.userPhone.replace(/[^\d]+/g,''),
      frm.value.userEmail,
      frm.value.userCpf.replace(/[^\d]+/g,''),
      frm.value.userAddress ,
      frm.value.userNumber,
      frm.value.userComplement,
      frm.value.userCity,
      frm.value.userState,
      frm.value.userPermission,
      frm.value.userPassword
    )

    this.showLoading();
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
