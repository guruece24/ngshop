import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '@bluebits/users';

@Component({
    selector: 'admin-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
    userName = '';
    status = true;

    constructor(private localStorageToken: LocalstorageService) {}

    ngOnInit(): void {
        this.getUserInfo();
    }

    // addToggle() {
    //     if (this.status) {
    //         this.status = false;
    //     } else {
    //         this.status = true;
    //     }

    //     alert(this.status);
    // }

    getUserInfo() {
        const token = this.localStorageToken.getToken();

        if (token) {
            const tokendecode = JSON.parse(atob(token.split('.')[1]));
            this.userName = tokendecode.userName;
        }
    }
}
