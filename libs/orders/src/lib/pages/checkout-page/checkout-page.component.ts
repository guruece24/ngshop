import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@bluebits/users';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { OrderItem } from '../../models/order-item';

@Component({
    selector: 'orders-checkout-page',
    templateUrl: './checkout-page.component.html',
    styles: []
})
export class CheckoutPageComponent implements OnInit {
    checkoutFormGroup: FormGroup;
    isSubmitted = false;
    orderItems: OrderItem[] = [];
    userId = '609d65943373711346c5e950';
    countries = [];

    constructor(
        private router: Router,
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private cartService: CartService,
        private ordersService: OrdersService
    ) {}

    ngOnInit(): void {
        this._initCheckoutForm();
        // this._getCartItems();
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

    private _getCountries() {
        this.countries = this.usersService.getCountries();
      }

    placeOrder() {
        this.isSubmitted = true;
        if (this.checkoutFormGroup.invalid) {
            return;
        }
    }

    backToCart() {
        this.router.navigate(['/cart']);
    }
    
    get checkoutForm() {
        return this.checkoutFormGroup.controls;
    }
}
