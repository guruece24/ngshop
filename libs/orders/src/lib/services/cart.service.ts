import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

export const CART_KEY = 'cart';
@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

    constructor(private messageService: MessageService) {}

    initCartLocalStorage() {
        const cart: Cart = this.getCart();
        if (!cart) {
            const initialCart = {
                items: [],
                isUpdated: false
            };

            const initialCartJson = JSON.stringify(initialCart);
            localStorage.setItem(CART_KEY, initialCartJson);
        }
    }

    getCart(): Cart {
        const cartJsonString: any = localStorage.getItem(CART_KEY);
        const cart: Cart = JSON.parse(cartJsonString);
        return cart;
    }

    setCartItem(cartItem: CartItem): Cart {
        const cart: Cart = this.getCart();
        const cartItemExist = cart.items?.find((item) => cartItem.productId === item.productId);
        if (cartItemExist) {
            cart.items?.map((item) => {
                if (item.productId === cartItem.productId) {
                    item.quantity = (cartItem?.quantity ?? 0) + (item?.quantity ?? 0);
                    cart.isUpdated = true;
                    return item;
                }
            });
        } else {
            cart.items?.push(cartItem);
            cart.isUpdated = true;
        }

        const cartJson = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJson);
        this.cart$.next(cart);
        return cart;
    }

    setCartItemNotUpdated(): void {
        const cart: Cart = this.getCart();
        cart.isUpdated = false;
        const cartJson = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJson);
        this.cart$.next(cart);
    }

    deleteCartItem(productId: string): Cart {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Cart Item is deleted!'
        });
        const cart: Cart = this.getCart();
        const newCart = cart.items?.filter((item) => item.productId !== productId);
        cart.items = newCart;

        const cartJson = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJson);

        this.cart$.next(cart);

        return cart;
    }
}
