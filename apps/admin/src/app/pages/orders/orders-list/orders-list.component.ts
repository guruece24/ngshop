import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@bluebits/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
// import { ORDER_STATUS } from '../order.constants';

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: []
})
export class OrdersListComponent implements OnInit {
    // orderStatuses = [];
    orders: Order[] = [];
    orderStatus = ORDER_STATUS;

    constructor(
        private ordersService: OrdersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
       // this._mapOrderStatus();
        this._getOrders();

        // const result = this.orderStatuses.find(({ label }) => label == 'Pending');
        // console.log(result.color);
    }

    // private _mapOrderStatus() {
    //     this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
    //         return {
    //             id: key,
    //             label: ORDER_STATUS[key].label,
    //             color: ORDER_STATUS[key].color
    //         };
    //     });
    // }

    _getOrders() {
        this.ordersService.getOrders().subscribe((orders) => {
            this.orders = orders;
        });
    }

    private deleteOrder(orderId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ordersService.deleteOrder(orderId).subscribe({
                    next: () => {
                        this._getOrders();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Order is deleted!'
                        });
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'No Order deleted!'
                        });
                    }
                });
            },
            reject: () => {
                this._getOrders();
            }
        });
    }

    viewOrder(orderId: string) {
        this.router.navigateByUrl(`orders/${orderId}`);
    }
}
