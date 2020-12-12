import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogsComponent } from './blogs.component';
import {ListBlogComponent} from './components/list-blog/list-blog.component';
import {AddBlogComponent} from './components/add-blog/add-blog.component';
import {UpdateBlogComponent} from './components/update-blog/update-blog.component';

const routes: Routes = [
  { path: '', component: BlogsComponent },
  { path: 'list-blogs' , component : ListBlogComponent},
  { path : 'add-blog' , component : AddBlogComponent},
  { path : 'update/:id' , component : UpdateBlogComponent}
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
