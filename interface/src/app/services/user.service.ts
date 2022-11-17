import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { userChart } from '../models/user-chart.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  // private usersSecond = [];
  // private usersUpdatedSecond = new Subject();

  private userPacient: User[] = [];
  private userUpdated = new Subject<User[]>();

  private chartPacient: userChart[] = [];
  private chartUpdated = new Subject<userChart[]>();

  reload = true;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUsers() {
    this.http.get<{ message: string, user: any, pacient: any, administrator: any, physiotherapist: any }>(environment.apiUrl + '/api/user')
    .pipe(map((userData) => {
      return userData.user.map(user => {
        return {
          userName: user.userName,
          userLastName: user.userLastName,
          userBirth: user.userBirth,
          userPhone: user.userPhone,
          userEmail: user.userEmail,
          userCpf: user.userCpf,
          userAddress: user.userAddress,
          userNumber: user.userNumber,
          userComplement: user.userComplement,
          userCity: user.userCity,
          userState: user.userState,
          userPermission: user.userPermission,
          password: user.password,
          id: user._id
        }
      });
    }))
    .subscribe((transformedUser) => {
      this.users = transformedUser;
      this.usersUpdated.next([...this.users]);
    });
  }

  getPermission() {
    return this.http.get<{ message: string, user: any, pacient: any, administrator: any, physiotherapist: any, usersPacient: any }>(environment.apiUrl + '/api/user');
  }

  getUsersUpdated() {
    return this.usersUpdated.asObservable();
  }

  getUsersPacientUpdated() {
    return this.userUpdated.asObservable();
  }

  getChartUsersPacientUpdated() {
    return this.chartUpdated.asObservable();
  }

  getUsersId(id: string) {
    return {...this.users.find(u => u.id === id)};
  }

  addUser(
    userName: string,
    userLastName: string,
    userBirth: string,
    userPhone: string,
    userEmail: string,
    userCpf: string,
    userAddress: string,
    userNumber: string,
    userComplement: string,
    userCity: string,
    userState: string,
    userPermission: string,
    password: string
  ) {

    const user = {
      id: null,
      userName: userName,
      userLastName: userLastName,
      userBirth: userBirth,
      userPhone: userPhone,
      userEmail: userEmail,
      userCpf: userCpf,
      userAddress: userAddress,
      userNumber: userNumber,
      userComplement: userComplement,
      userCity: userCity,
      userState: userState,
      userPermission: userPermission,
      password: password
    };

    console.log(user);

    this.http.post<{ message: string, userId: string }>(environment.apiUrl + '/api/user', user)
    .subscribe((responseData) => {
      // console.log(responseData.message);
      const id = responseData.userId
      user.id = id;
      this.users.push(user);
      this.usersUpdated.next([...this.users]);
      this.router.navigate(["/users"]);
      // this.users.push(user);
      // this.usersUpdated.next([...this.users]);
    });
  }

  updateUser(
    userId: string,
    userName: string,
    userLastName: string,
    userBirth: string,
    userPhone: string,
    userEmail: string,
    userCpf: string,
    userAddress: string,
    userNumber: string,
    userComplement: string,
    userCity: string,
    userState: string,
    userPermission: string,
    password: string
  ) {

    const user: User = {
      id: userId,
      userName: userName,
      userLastName: userLastName,
      userBirth: userBirth,
      userPhone: userPhone,
      userEmail: userEmail,
      userCpf: userCpf,
      userAddress: userAddress,
      userNumber: userNumber,
      userComplement: userComplement,
      userCity: userCity,
      userState: userState,
      userPermission: userPermission,
      password: password
    };

    console.log(user);

    this.http.put(environment.apiUrl + '/api/user/' + userId, user)
    .subscribe(() => {
      // const usersUpdated = [...this.users];
      // const oldUserIndex = usersUpdated.findIndex(user => user.id !== userId)
      // usersUpdated[oldUserIndex] = user;
      // this.users = usersUpdated;
      // this.usersUpdated.next([...this.users]);
      // this.router.navigate(["/users"]);
      const updatedUser = this.users.filter(user => user.id !== userId);
      this.users = updatedUser;
      this.usersUpdated.next([...this.users]);
      // this.router.navigate(["/users"]);
    });
  }

  updateChart(
    userId: string,
    treatment: string
  ) {

    const user = {
      id: userId,
      treatment: treatment
    };

    this.http.put(environment.apiUrl + '/api/userChart/' + userId, user)
    .subscribe(() => {
      const updatedUser = this.users.filter(user => user.id !== userId);
      this.users = updatedUser;
      this.usersUpdated.next([...this.users]);
    });
  }

  deleteUser(userId: String) {
    this.http.delete(environment.apiUrl + '/api/user/' + userId)
    .subscribe(() => {
      const updatedUser = this.users.filter(user => user.id !== userId);
      this.users = updatedUser;
      this.usersUpdated.next([...this.users]);
      this.router.navigate(["/users"]);
    });
  }

  getUsersPacient() {
    this.http.get<{ message: string, user: any }>(environment.apiUrl + '/api/userPacient')
    .pipe(map((userData) => {
      return userData.user.map(user => {
        return {
          userName: user.userName,
          userLastName: user.userLastName,
          userPermission: user.userPermission,
          userBirth: user.userBirth,
          id: user._id
        }
      });
    }))
    .subscribe((transformedUser) => {
      this.userPacient = transformedUser;
      this.userUpdated.next([...this.userPacient]);
    });
  }

  getChartId(id: string) {
    return {...this.userPacient.find(u => u.id === id)};
  }

  getChartsUser(userId: String) {
    this.http.get<{ message: string, prontuario: any }>(environment.apiUrl + '/api/prontuario/' + userId)
    .pipe(map((prontuarioData) => {
      return prontuarioData.prontuario.map(prontuario => {
        return {
          created: prontuario.created,
          treatment: prontuario.treatment,
          user: prontuario.user,
          id: prontuario._id,
        }
      });
    }))
    .subscribe((transformedUser) => {
      this.chartPacient = transformedUser;
      this.chartUpdated.next([...this.chartPacient]);
    });
  }
}
