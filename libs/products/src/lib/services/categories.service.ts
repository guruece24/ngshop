import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    apiURLCategories = environment.apiUrl + 'categories';

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiURLCategories);
    }

    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.apiURLCategories, category);
    }

    deleteCategory(categoryId: string): Observable<object> {
        return this.http.delete<object>(`${this.apiURLCategories}/${categoryId}`);
    }
}
