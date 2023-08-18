import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { Cart, CartItemDetailed } from '../../models/cart';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    providers: [MessageService],
    styles: []
})
export class CartPageComponent implements OnInit, OnDestroy {
    cartItemsDetailed: CartItemDetailed[] = [];
    cartCount = 0;
    endSubs$: Subject<any> = new Subject();

    constructor(
        private router: Router,
        private cartService: CartService,
        private ordersService: OrdersService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._getCartDetails();
    }

    private _getCartDetails() {
        this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((respCart) => {
            this.cartItemsDetailed = [];
            this.cartCount = respCart?.items?.length ?? 0;
            respCart.items?.forEach((cartItem) => {
                this.ordersService
                    .getProduct(cartItem?.productId ?? '')
                    .subscribe((respProduct) => {
                        this.cartItemsDetailed.push({
                            product: respProduct,
                            quantity: cartItem.quantity
                        });
                    });
            });
        });
    }

    deleteCartItem(cartItem: CartItemDetailed, itemsCount: number) {
        // let cartCountBeforeDel = 0;
        // this.cartService.cart$.subscribe((respCart) => {
        //     cartCountBeforeDel = respCart?.items?.length ?? 0;
        //     console.log(cartCountBeforeDel);
        // });

        const cart: Cart = this.cartService.deleteCartItem(cartItem.product.id);

        // this.cartService.cart$.subscribe((respCart) => {
        //     cartCountAfterDel = respCart?.items?.length ?? 0;
        //     console.log(cartCountAfterDel);
        // });

        if (itemsCount !== cart.items?.length) {
            //console.log(itemsCount);
            // console.log(cart.items?.length);
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: cartItem.product.name + ' is deleted from your cart!'
            });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No Cart Item deleted!'
            });
        }
    }

    updateCartItemQuantity(event:any, cartItem: CartItemDetailed) {
        console.log(event);
        this.cartService.setCartItem(
            {
              productId: cartItem.product.id,
              quantity: event.value
            }, true
          );
    }

    backToShop() {
        this.router.navigate(['/products']);
    }

    ngOnDestroy() {
        this.endSubs$.next(0);
        this.endSubs$.complete();
    }
}
