import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Cart, CartItem, CartService } from '@bluebits/orders';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styles: []
})
export class ProductItemComponent implements OnInit {
    @Input() product: Product = new Product();

    constructor(private cartService: CartService, private messageService: MessageService) {}

    ngOnInit(): void {}

    addProductToCart() {
        let cartItem: CartItem = {
            productId: this.product.id,
            quantity: 1
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
