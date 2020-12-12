import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {retry} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Blog} from '../models/Blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient:HttpClient) { }

  // addBlog
  public addBlog(blog):Observable<Blog>{
    let dataURL:string = `http://127.0.0.1:5000/api/blogs/`;
   return this.httpClient.post<Blog>(dataURL, blog).pipe(
      retry(1)
    );
  }


  // get All Blogs
  public getAllBlogs():Observable<Blog[]>{
    let dataURL:string = 'http://127.0.0.1:5000/api/blogs';
    return this.httpClient.get<Blog[]>(dataURL).pipe(
      retry(1)
    )
  }

  // get a single Blog
  public getBlog(blogId):Observable<Blog>{
    let dataURL:string = `http://127.0.0.1:5000/api/blogs/${blogId}`;
    return this.httpClient.get<Blog>(dataURL).pipe(
      retry(1)
    )
  }

  // update Blog
  public updateBlog(blogId,blog):Observable<Blog>{
    let dataURL:string = `http://127.0.0.1:5000/api/blogs/${blogId}`;
    return this.httpClient.put<Blog>(dataURL,blog).pipe(
      retry(1)
    )
  }

  // delete Blog
  public deleteBlog(blogId):Observable<Blog>{
    let dataURL:string = `http://127.0.0.1:5000/api/blogs/${blogId}`;
    return this.httpClient.delete<Blog>(dataURL).pipe(
      retry(1)
    )
  }
}
