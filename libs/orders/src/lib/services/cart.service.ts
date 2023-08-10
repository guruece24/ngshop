import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';
@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor() {}

    initCartLocalStorage() {
        const cart: Cart = this.getCart();
        if (!cart) {
            const initialCart = {
                items: []
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
                    item.quantity = cartItem?.quantity! + item?.quantity!;
                    return item;
                }
            });
        } else {
            cart.items?.push(cartItem);
        }

        const cartJson = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJson);

        return cart;
    }
}
