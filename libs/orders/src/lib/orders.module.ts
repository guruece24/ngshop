import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuard } from '@bluebits/users';

const routes: Routes = [
    {
        path: 'cart',
        component: CartPageComponent
    },
    {
        path: 'checkout',
        canActivate: [AuthGuard],
        component: CheckoutPageComponent
    },
    {
        path: 'success',
        component: ThankYouComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        BadgeModule,
        AvatarModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
        ButtonModule,
        InputNumberModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        InputMaskModule,
        DropdownModule,
        ToastModule
    ],
    providers: [MessageService],
    declarations: [
        CartIconComponent,
        CartPageComponent,
        OrderSummaryComponent,
        CheckoutPageComponent,
        ThankYouComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        CartIconComponent,
        CartPageComponent,
        RouterModule,
        OrderSummaryComponent,
        CheckoutPageComponent,
        ThankYouComponent
    ]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
