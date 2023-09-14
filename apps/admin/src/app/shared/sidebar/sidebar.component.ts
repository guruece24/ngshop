import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@bluebits/users';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    //@Input()
    // status: boolean;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
       // console.log(this.status);
    }

    logoutUser() {
        this.authService.logout();
    }
}
