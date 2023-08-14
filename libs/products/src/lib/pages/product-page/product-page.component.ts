import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

import { Cart, CartItem, CartService } from '@bluebits/orders';
import { MessageService } from 'primeng/api';

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
    quantity = 1;

    constructor(
        private prodService: ProductsService,
        private route: ActivatedRoute,
        private cartService: CartService,
        private messageService: MessageService
    ) {}

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
                }
            });
    }

    private addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: this.quantity
        };
        const cart: Cart = this.cartService.setCartItem(cartItem);
        if (cart.isUpdated) {
            this.cartService.setCartItemNotUpdated();
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Cart is Updated!'
            });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No Cart Updated!'
            });
        }
    }
}
