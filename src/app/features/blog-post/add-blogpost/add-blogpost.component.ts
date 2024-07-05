import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit {
  //variables
  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  
  private addBlogPostSubscription?: Subscription;
//constructor
  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true,
      categories: []
    }
  } //end constructor
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  onFormSubmit(): void {
    console.log(this.model);
    this.addBlogPostSubscription = this.blogPostService.createBlogPost(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    })
    console.log(this.model);
  }

  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
  }

}
