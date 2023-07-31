import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@bluebits/orders';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styles: []
})
export class OrdersDetailComponent implements OnInit {
    order: Order;
    orderStatuses = [];
    selectedStatus: any;

    constructor(
        private orderService: OrdersService,
        private messageService: MessageService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        //this._mapOrderStatus();
        this._getOrder();
    }

    private _getOrder() {
        //note this is getorder(orderid) and not getorders
        this.route.params.subscribe((params) => {
            if (params.id) {
                //querystrng params.id=orderid sent from orderslist page
                this.orderService.getOrder(params.id).subscribe((order) => {
                    this.order = order;
                    this.selectedStatus = order.status;
                });
            }
        });
    }
}
