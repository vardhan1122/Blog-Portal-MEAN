import { Component, OnInit } from '@angular/core';
import {BlogService} from './services/blog.service';
import {Blog} from './models/Blog';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  public blogs:Blog[]=[];
  // public blogs:Blog[];

  public errorMessage:string;
  constructor(private blogService:BlogService) { }

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((data) => {
      this.blogs = data
    } , (err) => {
      this.errorMessage = err;
    });
  }


}
