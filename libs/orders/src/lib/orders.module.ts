import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MessageService } from 'primeng/api';


@NgModule({
    imports: [CommonModule, BadgeModule, AvatarModule],
    providers: [MessageService],
    declarations: [CartIconComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [CartIconComponent]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
