import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiEndpoint = '';
  constructor(private httpClient: HttpClient) {
    this.apiEndpoint = environment.apiEndpoint + "categories";
  }

  GetCategories(): Observable<Category[]> {

    let newPath = this.apiEndpoint;
    return this.httpClient.get<Category[]>(newPath);
  }

  GetCategoryById(id: number): Observable<Category> {
    let newPath = this.apiEndpoint + `/${id}`
    return this.httpClient.get<Category>(newPath);
  }

  DeleteCategoryById(id: number) {
    let newPath = this.apiEndpoint + `/${id}`
    return this.httpClient.delete<Category>(newPath)
  }

  CreateCategory(category: Category): Observable<Category> {
    let newPath = this.apiEndpoint + "/"
    return this.httpClient.post<Category>(newPath, category)
  }

  UpdateCategory(category: Category): Observable<Category> {
    let newPath = this.apiEndpoint + `/${category.id}`
    return this.httpClient.put<Category>(newPath, category)
  }
}
