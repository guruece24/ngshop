import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, User } from '@bluebits/users';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styles: []
})
export class UsersListComponent implements OnInit {
    users: User[] = [];

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private usersService: UsersService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }

    private _getUsers() {
        this.usersService.getUsers().subscribe((usersdata) => {
            this.users = usersdata;
        });
    }

    private deleteUser(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService.deleteUser(categoryId).subscribe({
                    next: () => {
                        this._getUsers();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'User is deleted!'
                        });
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'No User deleted!'
                        });
                    }
                });
            },
            reject: () => {
                this._getUsers();
            }
        });
    }

    private updateUser(categoryId: string) {
        this.router.navigateByUrl(`categories/form/${categoryId}`);
    }
}
