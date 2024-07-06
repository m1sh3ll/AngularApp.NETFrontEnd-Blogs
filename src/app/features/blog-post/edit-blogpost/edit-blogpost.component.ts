import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { UpdateBlogPost } from '../models/update-blog-post.mode';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})



export class EditBlogpostComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  editBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  imageSelectSubscription?: Subscription;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  isImageSelectorVisible: boolean = false;


  constructor(
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router) {
  };

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.paramsSubscription = this.route.paramMap
      .subscribe({
        next: (params) => {
          this.id = params.get('id');

          if (this.id) {
            //get the data from the API
            this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id)
              .subscribe({
                next: (response) => {
                  this.model = response;
                  this.selectedCategories = response.categories.map(x => x.id);
                },
                error: (error) => {
                  console.log("An error occurred");
                }
              })
          }
          console.log("Get was successful!")
        },
        error: (error) => {
          console.log("An error occurred")
        }
      });

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

    //Convert this model to request object
    if (this.model && this.id) {
      var updateBlogPost: UpdateBlogPost = {
        title: this.model.title,
        shortDescription: this.model.shortDescription,
        content: this.model.content,
        featuredImageUrl: this.model.featuredImageUrl,
        urlHandle: this.model.urlHandle,
        publishedDate: this.model.publishedDate,
        author: this.model.author,
        isVisible: this.model.isVisible,
        categories: this.selectedCategories ?? []
      };

      if (this.id) {
        this.editBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
          .subscribe({
            next: (reponse) => {
              this.router.navigateByUrl('/admin/blogposts')
            }
          })


      }

    }
  }
  onDelete(): void {
    if (this.id) {
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
        .subscribe({
          next: (reponse) => {
            this.router.navigateByUrl('/admin/blogposts');
          }
        })
    }
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.editBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }

}
