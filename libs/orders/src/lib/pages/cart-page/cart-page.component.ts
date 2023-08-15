import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import {  CartItemDetailed } from '../../models/cart';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styles: []
})
export class CartPageComponent implements OnInit, OnDestroy {
    cartItemsDetailed: CartItemDetailed[] = [];
    cartCount = 0;
    endSubs$: Subject<any> = new Subject();

    constructor(
        private router: Router,
        private cartService: CartService,
        private ordersService: OrdersService
    ) {}

    ngOnInit(): void {
        this._getCartDetails();
    }

    private _getCartDetails() {
      this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(respCart => {
        respCart.items.forEach(cartItem => {
          
        });
      })
    }

    // deleteCartItem(cartItem: CartItemDetailed) {

    // }

    // updateCartItemQuantity(event, cartItem: CartItemDetailed) {

    // }

    backToShop() {
      this.router.navigate(['/products']);
    }

    ngOnDestroy() {
        this.endSubs$.next(0);
        this.endSubs$.complete();
    }
}
