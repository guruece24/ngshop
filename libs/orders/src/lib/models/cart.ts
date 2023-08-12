export class Cart {
    items?: CartItem[];
    isUpdated?: boolean;
}

export class CartItem {
    productId?: string;
    quantity?: number;
}

export class CartItemDetailed {
    product?: any;
    quantity?: number;
}
