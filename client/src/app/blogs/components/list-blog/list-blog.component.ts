import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {Blog} from '../../models/Blog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css']
})
export class ListBlogComponent implements OnInit {

  public blogs:Blog[] = [];
  public errorMessage:string;
  constructor(private blogService : BlogService,
              private router:Router) { }

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((data) => {
      this.blogs = data
    }, (err) => {
      this.errorMessage = err;
    });
  }

  //clickDeleteProduct
  public clickDeleteBlog(blogId){
    this.blogService.deleteBlog(blogId).subscribe((data) => {
      // reload the same component
      this.router.navigateByUrl('/blogs', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/blogs/list-blogs']).then(r => {});
      });
    });
  }

}
