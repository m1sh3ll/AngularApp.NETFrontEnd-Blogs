import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) {

  }

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`https://nerdommicro-001-site1.ctempurl.com/api/categories?addAuth=true`, model
    );
  }

  getAllCategories(query?: string): Observable<Category[]> {

    let params = new HttpParams();

    if (query) {
      params = params.set('query', query)
    }

    return this.http.get<Category[]>(`https://nerdommicro-001-site1.ctempurl.com/api/categories`, {
      params: params
    });
    
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`https://nerdommicro-001-site1.ctempurl.com/api/categories/${id}`);
  }

 

  updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest): Observable<Category> {
    return this.http.put<Category>(`https://nerdommicro-001-site1.ctempurl.com/api/categories/${id}?addAuth=true`,
      updateCategoryRequest
    );
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`https://nerdommicro-001-site1.ctempurl.com/api/categories/${id}?addAuth=true`
    );
  }


}
