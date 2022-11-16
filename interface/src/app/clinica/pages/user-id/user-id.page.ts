import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.page.html',
  styleUrls: ['./user-id.page.scss'],
})
export class UserIdPage implements OnInit {
  eventSource = [];
  users: User[] = [];
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
  public cpf = '';
  public phone = '';
  public birth = '';
  private mode = '';

  constructor(
    public userService: UserService,
    private navCtrl: NavController,
    public router: ActivatedRoute,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    // this.userService.getUsers();
    // this.usersSub = this.userService.getUsersUpdated()
    // .subscribe((users) => {
    //   this.users = users;
    // });
    // this.isLoading = true;
    // this.router.paramMap.subscribe((paramMap: ParamMap) => {
    //   this.id = paramMap.get('userId');
    //   this.user = this.userService.getUsersId(this.id);
    //   this.isLoading = false;
    // })
    this.isLoading = true;
    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdated()
    .subscribe((users: User[]) => {

      this.users = users;

      this.birth = this.user.userBirth.replace(/[^0-9]/g, "").replace(/^([\d]{2})([\d]{2})?([\d]{4})?/, "$1/$2/$3");

      this.cpf = this.user.userCpf.replace(/[^0-9]/g, "").replace(/^([\d]{3})([\d]{3})?([\d]{3})?([\d]{2})?/, "$1.$2.$3-$4");

      const phone = this.user.userPhone;
      this.isLoading = false;
      if (phone.length === 11) {
        return this.phone = phone.replace(/[^0-9]/g, "").replace(/^([\d]{2})([\d]{5})?([\d]{4})?/, "($1) $2-$3");
      } else {
        return this.phone = phone.replace(/[^0-9]/g, "").replace(/^([\d]{2})([\d]{4})?([\d]{4})?/, "($1) $2-$3");
      }
    });

    this.getAllUsers();
  }

  redirectUser() {
    this.navCtrl.navigateRoot('users');
  }

  getAllUsers() {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('userId');
      this.user = this.userService.getUsersId(this.id);
      // console.log(this.id);
    })
  }

  onDelete(userId: String) {
    this.userService.deleteUser(userId);
    this.getAllUsers();
    this.showLoading();
  }

  ngSubmit(frm: any) {
    if (frm.invalid) {
      return;
    }

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
    // this.getAllUsers();
    // setTimeout(() => {
    //   this.navCtrl.navigateRoot('users');
    // }, 1000);
    this.showLoading();
  }

  // navigate() {
  //   setTimeout(() => {
  //     console.log('ok');

  //     this.navCtrl.navigateRoot('users');
  //     this.getAllUsers();
  //   }, 1000);
  // }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Salvando...',
      duration: 2000,
      cssClass: 'custom-loading',
    });
    loading.present();
  }
}
