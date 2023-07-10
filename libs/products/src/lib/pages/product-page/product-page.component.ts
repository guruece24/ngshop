import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'products-product-page',
    templateUrl: './product-page.component.html',
    styles: []
})
export class ProductPageComponent implements OnInit {
    product: Product = new Product();
    selectedImageAny: any;
    selectedImage: any;
    endSubs$: Subject<any> = new Subject();
    quantity: number = 0;

    constructor(private prodService: ProductsService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params.productid) {
                this._getProduct(params.productid);
            }
        });
    }

    ngOnDestroy(): void {
        this.endSubs$.next(0);
        this.endSubs$.complete();
    }

    private _getProduct(id: string) {
        this.prodService
            .getProduct(id)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((resProduct) => {
                this.product = resProduct;
                if (resProduct.images) {
                    this.selectedImageAny = resProduct.images;
                    this.selectedImage = this.selectedImageAny[0];
                    //console.log(this.selectedImageAny[0]);
                    //console.log(this.selectedImageAny);
                }
            });
    }

    private addProductToCart() {}
}
