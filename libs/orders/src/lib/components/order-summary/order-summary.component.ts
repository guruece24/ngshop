import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
    selector: 'orders-order-summary',
    templateUrl: './order-summary.component.html',
    styles: []
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
    endSubs$: Subject<any> = new Subject();
    totalPrice = 0;
    isCheckout = false;

    constructor(
        private router: Router,
        private cartService: CartService,
        private ordersService: OrdersService
    ) {
      //this.router.url.includes('checkout') ? (this.isCheckout = true) : (this.isCheckout = false);
    }

    ngOnInit(): void {
        this._getOrderSummary();
    }

    ngOnDestroy(): void {
        this.endSubs$.next(0);
        this.endSubs$.complete();
    }

    _getOrderSummary() {
        this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
            this.totalPrice = 0;
            if (cart) {
                cart.items?.map((item) => {
                    this.ordersService
                        .getProduct(item?.productId ?? '')
                        .pipe(take(1))
                        .subscribe((product) => {
                            this.totalPrice += (product?.price ?? 0) * (item?.quantity ?? 0);
                        });
                });
            }
        });
    }
}
