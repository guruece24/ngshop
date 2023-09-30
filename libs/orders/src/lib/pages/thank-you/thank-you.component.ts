import { Component, OnInit } from '@angular/core';
import { AuthService } from '@bluebits/users';

@Component({
    selector: 'orders-thank-you-page',
    templateUrl: './thank-you.component.html',
    styles: []
})
export class ThankYouComponent implements OnInit {
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        // console.log(this.status);
    }

    logoutUser() {
        this.authService.logout();
    }
}
