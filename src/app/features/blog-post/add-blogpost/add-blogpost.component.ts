import { Component } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {
  model: AddBlogPost;
  private addBlogPostSubscription?: Subscription;

  constructor(private blogPostService: BlogPostService,
    private router: Router) 
    {
    this.model = {
      title: '',
      shortDescription: '',      
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      publishedDate: new Date(),
      author: '',   
      isVisible: true
    }
  } //end constructor

  onFormSubmit(): void {
    this.addBlogPostSubscription = this.blogPostService.createBlogPost(this.model).subscribe({
      next: (response) =>{
        this.router.navigateByUrl('/');
      }
    })
    console.log(this.model);
  }

  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
  }
  
}
