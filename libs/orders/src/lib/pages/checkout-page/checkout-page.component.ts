import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@bluebits/users';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { ORDER_STATUS } from '../../order.constants';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'orders-checkout-page',
    templateUrl: './checkout-page.component.html',
    styles: []
})
export class CheckoutPageComponent implements OnInit {
    checkoutFormGroup: FormGroup;
    isSubmitted = false;
    orderItems: OrderItem[] = [];
    userId = '5fb3d05216a69e00246c02ee';
    countries = [];

    constructor(
        private router: Router,
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private cartService: CartService,
        private ordersService: OrdersService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._initCheckoutForm();
        this._getCartItems();
        this._getCountries();
    }

    private _initCheckoutForm() {
        this.checkoutFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            phone: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            zip: ['', Validators.required],
            apartment: ['', Validators.required],
            street: ['', Validators.required]
        });
    }

    private _getCartItems() {
        const cart: Cart = this.cartService.getCart();
        this.orderItems = cart.items?.map((item) => {
            return {
                product: item.productId,
                quantity: item.quantity
            };
        });
    }

    private _getCountries() {
        this.countries = this.usersService.getCountries();
    }

    placeOrder() {
        this.isSubmitted = true;
        if (this.checkoutFormGroup.invalid) {
            return;
        }

        const order: Order = {
            orderItems: this.orderItems,
            shippingAddress1: this.checkoutForm.street.value,
            shippingAddress2: this.checkoutForm.apartment.value,
            city: this.checkoutForm.city.value,
            zip: this.checkoutForm.zip.value,
            country: this.checkoutForm.country.value,
            phone: this.checkoutForm.phone.value,
            status: 0,
            user: this.userId,
            dateOrdered: `${Date.now()}`
        };

        this.ordersService.createOrder(order).subscribe({
            next: () => {
                //redirect to thank you page // payment
                this.cartService.emptyCart();
                this.router.navigate(['/success']);
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No Order Created!'
                });
            }
        });
    }

    backToCart() {
        this.router.navigate(['/cart']);
    }

    get checkoutForm() {
        return this.checkoutFormGroup.controls;
    }
}
