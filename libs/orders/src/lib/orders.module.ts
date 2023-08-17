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



const routes: Routes = [
    {
        path: 'cart',
        component: CartPageComponent
    },
    {
        path: 'checkout',
        component: CartPageComponent
    },
    {
        path: 'success',
        component: CartPageComponent
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
    declarations: [CartIconComponent, CartPageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [CartIconComponent, CartPageComponent, RouterModule]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
