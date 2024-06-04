import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiEndpoint = '';
  wholeCategories: Category[] = []
  private dataSubject = new BehaviorSubject<Category[]>([]);
  categoriesData$ = this.dataSubject.asObservable();
  constructor(private httpClient: HttpClient) {
    this.apiEndpoint = environment.apiEndpoint + "categories";
  }

  GetCategoriesSave() {

    let newPath = this.apiEndpoint;
    return this.httpClient.get<Category[]>(newPath).subscribe(result => {
      this.wholeCategories = result
    });
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

  fetchData(): Observable<any[]> {
    if (this.dataSubject.getValue().length === 0) {
      // Veri henüz yüklenmediyse, veritabanından çek ve BehaviorSubject'e kaydet
      return this.GetCategories().pipe(
        tap(fetchedData => this.dataSubject.next(fetchedData))
      );
    } else {
      // Veri önceden yüklendiyse, BehaviorSubject'in mevcut değerini Observable olarak döndür
      return this.categoriesData$;
    }
  }

  getData(): any[] {
    return this.dataSubject.getValue();
  }

  updateData(newData: any[]): void {
    this.dataSubject.next(newData);
  }
}
