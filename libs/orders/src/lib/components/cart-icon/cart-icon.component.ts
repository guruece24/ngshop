import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService, UsersService } from '@bluebits/users';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'orders-cart-icon',
    templateUrl: './cart-icon.component.html',

    styles: []
})
export class CartIconComponent implements OnInit, OnDestroy {
    cartCount = 0;
    isSigned = false;
    unsubscribe$: Subject<any> = new Subject();

    constructor(
        private cartService: CartService,
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.cartService.cart$.subscribe((cart) => {
            this.cartCount = cart?.items?.length ?? 0;
        });
        //console.log('guru');
        this._isUserSignedIn();
    }

    private _isUserSignedIn() {
        this.usersService
            .observeCurrentUser()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((user) => {
                if (user) {
                    //console.log('guru1');
                    this.isSigned = true;
                } else {
                    this.isSigned = false;
                }
            });
    }

    logoutUser() {
        this.authService.logout();
        this.isSigned = false;
    }

    ngOnDestroy() {
        this.unsubscribe$.next(0);
        this.unsubscribe$.complete();
    }
}
