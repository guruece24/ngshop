import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';

@Component({
    selector: 'pages-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    products: Product[] = [];
    categories: Category[] = [];
    //checked: boolean = false;

    constructor(
        private productsService: ProductsService,
        private categoriesService: CategoriesService
    ) {}

    ngOnInit(): void {
        this._getProducts();
        this._getCategories();
    }

    private _getProducts(categoriesFilter?: any[]) {
        this.productsService.getProducts(categoriesFilter).subscribe((prods) => {
            this.products = prods;
        });
    }

    _getCategories() {
        this.categoriesService.getCategories().subscribe((cats) => {
            this.categories = cats;
            //console.log(this.categories);
        });
    }

    categoryFilter() {
        const selectedCategoryIds = this.categories
            .filter((category) => category.checked)
            .map((category) => category.id);

            this._getProducts(selectedCategoryIds);
        //console.log('categoryfileter');
    }
}
