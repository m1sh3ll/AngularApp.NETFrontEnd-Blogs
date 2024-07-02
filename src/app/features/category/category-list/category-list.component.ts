import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit { 
  
  // private CategorySubscription?: Subscription

  // categories?: Category[];
  categories$?: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {    
  }
 
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    // .subscribe({
    //   next: (response) => {
    //     this.categories = response;
    //     console.log("Get was successful!")
    //   },
    //   error: (error) => {
    //     console.log("An error occurred")
    //   }
    // });
  }

}
