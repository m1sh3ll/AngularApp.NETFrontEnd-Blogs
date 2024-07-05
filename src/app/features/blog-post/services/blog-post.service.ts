import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BlogPost } from '../models/blog-post.model';
import { UpdateBlogPost } from '../models/update-blog-post.mode';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }

  createBlogPost(model: AddBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`https://michellenesbitt.com/api/blogposts?addAuth=true`, model);
  }

  getAllBlogPosts() : Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`https://michellenesbitt.com/api/blogposts`);
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`https://michellenesbitt.com/api/blogposts/${id}`);
  }

  updateBlogPost(id: string, updateBlogPost: UpdateBlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`https://michellenesbitt.com/api/blogposts/${id}?addAuth=true`,
      updateBlogPost     
    );
  }

  deleteBlogPost(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`https://michellenesbitt.com/api/blogposts/${id}?addAuth=true`      
    );
  }

}
