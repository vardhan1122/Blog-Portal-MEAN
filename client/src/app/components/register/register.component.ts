import { Component, OnInit } from '@angular/core';
import {IUser} from '../../models/IUser';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  // submitRegister
  public submitRegister(){
    this.userService.register(this.user).subscribe((data) => {
      this.router.navigate(['/login']);
    } , (err) => {
      this.errorMessage = err.error.msg;
    });
  }

}
