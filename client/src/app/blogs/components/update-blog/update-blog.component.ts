import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BlogService} from '../../services/blog.service';
import {Blog} from '../../models/Blog';
// import { blogData} from '../../../interface/blogData';



@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {

  public blogId:string;
  public selectedBlog:Blog;
  public errorMessage:string;
  public imageFileName:string;
  constructor(private activatedRoute:ActivatedRoute,
              private blogService:BlogService,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap) => {
      this.blogId = param.get('id');
    });
    this.blogService.getBlog(this.blogId).subscribe((data) => {
      this.selectedBlog = data;
      this.imageFileName = data.image;
    } , (err) => {
      this.errorMessage = err;
    });
  }

  public onChangeImage(event){
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        if(reader.result){
          this.imageFileName = String(reader.result);
          this.selectedBlog.image = String(reader.result)
        }
      });
    }
  }

  //submitUpdateProduct
  public submitUpdateBlog(){
    this.blogService.updateBlog(this.blogId, this.selectedBlog).subscribe((data) => {
      this.router.navigate(['/blogs/list-blogs']);
    }, (err) => {
      console.error(err);
    });
  }
}
