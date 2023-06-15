import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    apiURLProducts = environment.apiUrl + 'products';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiURLProducts);
    }

    //  getCategoryById(categoryId : string): Observable<Product> {
    //     return this.http.get<Product>(`${this.apiURLCategories}/${categoryId}`);
    // }

    // createCategory(product: Product): Observable<Product> {
    //     return this.http.post<Product>(this.apiURLCategories, product);
    // }

    // deleteCategory(productId: string): Observable<object> {
    //     return this.http.delete<object>(`${this.apiURLCategories}/${productId}`);
    // }

    // updateCategoy(product: Product): Observable<Product> {
    //     return this.http.put<Product>(`${this.apiURLCategories}/${product.id}`, product);
    // }
}
