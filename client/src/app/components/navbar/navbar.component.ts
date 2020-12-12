import { Component, OnInit } from '@angular/core';
//import login service
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // login service
  constructor(public userService:UserService) { }

  ngOnInit(): void {
  }

}
