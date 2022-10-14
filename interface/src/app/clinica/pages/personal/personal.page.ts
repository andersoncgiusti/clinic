import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {
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
  private mode = '';
  private userId: String;

  constructor(
    public userService: UserService,
    private navCtrl: NavController,
    public router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdated()
    .subscribe((users: User[]) => {
      this.users = users;
    });
  }

  getUsers() {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('userId');
      this.user = this.userService.getUsersId(this.id);
      console.log(this.id);
    })

    this.getUsers();
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
      frm.value.userPermission
    )

    this.getUsers();

    setTimeout(() => {
      this.getUsers();
    }, 1000);
  }

}
