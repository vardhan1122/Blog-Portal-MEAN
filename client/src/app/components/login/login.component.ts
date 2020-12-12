import { Component, OnInit } from '@angular/core';
import {IUser} from '../../models/IUser';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:IUser = {
    name : '',
    email : '',
    password : ''
  };
  public errorMessage:string;
  constructor(private userService:UserService,
              private router:Router) { }

  ngOnInit(): void {
  }

  // submitLogin
  public submitLogin(){
    // login logic
    this.userService.login(this.user).subscribe((data) => {
      // store the token in browser local Storage
      localStorage.setItem('token', data.token);

      // get the userInfo
      this.userService.getUserInfo().subscribe((data) => {
        localStorage.setItem('user', JSON.stringify(data));
      });

      this.router.navigate(['/blogs']);
    } , (err) => {
      this.errorMessage = err.error.msg;
    });

  }
}
