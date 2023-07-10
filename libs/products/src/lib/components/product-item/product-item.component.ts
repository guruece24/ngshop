import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styles: []
})

export class ProductItemComponent implements OnInit {
    @Input() product: Product = new Product();

    constructor() {
        //console.log(this.product);
    }

    ngOnInit(): void {}
}
