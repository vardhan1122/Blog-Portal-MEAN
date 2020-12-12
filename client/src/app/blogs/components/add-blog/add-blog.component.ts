import { Component, OnInit } from '@angular/core';
import {Blog} from '../../models/Blog';
import {BlogService} from '../../services/blog.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  public blog:Blog = {
    _id : '',
    name : '',
    image : '',
    heading : '',
    info : '',
    dataUrl : '',
    created :''
  };
  public imageFileName:any;
  public result:HTMLInputElement;
  constructor(private blogService:BlogService,
              private router:Router) { }

  ngOnInit(): void {
  }

  public async onChangeImage(event){
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      this.imageFileName = file;
      reader.addEventListener('load', () => {
        return reader.result ? this.blog.image = String(reader.result) : '';
      });
    }
  }


  public submitAddBlog(){
   this.blogService.addBlog(this.blog).subscribe((data) => {
     this.router.navigate(['/blogs/list-blogs']);
   }, (err) => {
     console.error(err);
   });
  }

}
