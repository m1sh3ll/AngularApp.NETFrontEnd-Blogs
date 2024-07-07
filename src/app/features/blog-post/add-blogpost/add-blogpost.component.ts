import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})

export class AddBlogpostComponent implements OnInit {

  //variables
  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  addBlogPostSubscription?: Subscription;
  imageSelectSubscription?: Subscription;
  isImageSelectorVisible: boolean = false;



  //constructor
  constructor(
    private blogPostService: BlogPostService,   
    private categoryService: CategoryService,
    private imageService: ImageService,
    private router: Router) {
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

    this.imageSelectSubscription = this.imageService.onSelectImage()
      .subscribe({
        next: (response) => {
          if (this.model) {
            this.model.featuredImageUrl = response.url;
            this.closeImageSelector();
          }
        }
      })
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


  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }

}
