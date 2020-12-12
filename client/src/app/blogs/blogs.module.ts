import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { UpdateBlogComponent } from './components/update-blog/update-blog.component';
import { ListBlogComponent } from './components/list-blog/list-blog.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    BlogsComponent,
     AddBlogComponent,
     UpdateBlogComponent,
     ListBlogComponent
    ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    FormsModule
  ]
})
export class BlogsModule { }
