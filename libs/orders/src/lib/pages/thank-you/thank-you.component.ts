import { Component, OnInit } from '@angular/core';
import { AuthService } from '@bluebits/users';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'orders-thank-you-page',
    templateUrl: './thank-you.component.html',
    styles: []
})
export class ThankYouComponent implements OnInit {
   orderId = '';
   
    constructor(
        private authService: AuthService,
        private cartService: CartService,
        private ordersService: OrdersService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const orderData = this.ordersService.getCachedOrderData();

        this.ordersService.createOrder(orderData).subscribe({
            next: (response) => {
                console.log(response);
                this.orderId = response.id;
                
                //redirect to thank you page // payment
                this.cartService.emptyCart();
                this.ordersService.removeCachedOrderData();

                //this.router.navigate(['/success']);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Great Job! Order Created!'
                });
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No Order Created!'
                });
            }
        });
        // console.log(this.status);
    }

    logoutUser() {
        this.authService.logout();
    }
}
