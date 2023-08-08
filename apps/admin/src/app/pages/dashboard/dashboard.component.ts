import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@bluebits/orders';
import { ProductsService } from '@bluebits/products';
import { LocalstorageService, UsersService } from '@bluebits/users';
import { Subject, combineLatest, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    statistics = [];

    data1: any;
    options1: any;
    data2: any;
    options2: any;

    endsubs$: Subject<any> = new Subject();

    constructor(
        private userService: UsersService,
        private productService: ProductsService,
        private ordersService: OrdersService
    ) {}

    ngOnInit(): void {
        combineLatest([
            this.ordersService.getOrdersCount(),
            this.productService.getProductsCount(),
            this.userService.getUsersCount(),
            this.ordersService.getTotalSales()
        ])
            .pipe(takeUntil(this.endsubs$))
            .subscribe((values) => {
                this.statistics = values;
                console.log(this.statistics[0]);
                this.loadPieChart(this.statistics[0], this.statistics[1], this.statistics[2]);
                //this.loadDoughnutChart(this.statistics[0], this.statistics[1], this.statistics[2]);
                this.loadDoughnutChart(this.statistics);
            });
    }

    loadDoughnutChart(statistic = []) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data2 = {
            labels: ['Orders', 'Products', 'Users', 'TotalSales'],
            datasets: [
                {
                    data: statistic,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--cyan-400'),
                        documentStyle.getPropertyValue('--cyan-500'),
                        documentStyle.getPropertyValue('--cyan-600'),
                        documentStyle.getPropertyValue('--cyan-200')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--cyan-800'),
                        documentStyle.getPropertyValue('--cyan-800'),
                        documentStyle.getPropertyValue('--cyan-800')
                    ]
                }
            ]
        };

        this.options2 = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
    }

    loadPieChart(num1: any, num2: any, num3: any) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data1 = {
            labels: ['Orders', 'Products', 'Users'],
            datasets: [
                {
                    data: [num1, num2, num3],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--cyan-400'),
                        documentStyle.getPropertyValue('--cyan-600'),
                        documentStyle.getPropertyValue('--cyan-200')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--cyan-800'),
                        documentStyle.getPropertyValue('--cyan-800'),
                        documentStyle.getPropertyValue('--cyan-800')
                    ]
                }
            ]
        };

        this.options1 = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        this.endsubs$.next(0);
        this.endsubs$.complete();
    }
}
