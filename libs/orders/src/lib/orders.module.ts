import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MessageService } from 'primeng/api';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';

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
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })
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
