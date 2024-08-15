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
  //variables
  categories$?: Observable<Category[]>;
  totalCount?: number;
  list: number[] = [];
  pageNumber = 1;
  pageSize = 2;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategoryCount()
      .subscribe({
        next: (value) => {
          this.totalCount = value;
          this.list = new Array(Math.ceil(value / this.pageSize))

          this.categories$ = this.categoryService.getAllCategories(
            undefined,
            "Name",
            "asc",
            this.pageNumber,
            this.pageSize);
        }
      })   
  }

  onSearch(query: string) {
    this.categories$ = this.categoryService.getAllCategories(query, "Name", "asc",this.pageNumber, this.pageSize);
  }

  sort(sortBy: string, sortDirection: string) {
    this.categories$ = this.categoryService.getAllCategories(undefined, sortBy, sortDirection,this.pageNumber, this.pageSize);
  }

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber;

    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      "Name",
      "asc",
      this.pageNumber,
      this.pageSize);
  }

  getNextPage() {
    if (this.pageNumber + 1 > this.list.length) {
      return;
    }
    this.pageNumber += 1;

    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      "Name",
      "asc",
      this.pageNumber,
      this.pageSize);
  }

  getPrevPage() {
    if (this.pageNumber - 1 < 1) {
      return;
    }
    this.pageNumber -= 1;

    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      "Name",
      "asc",
      this.pageNumber,
      this.pageSize);
  }
}
