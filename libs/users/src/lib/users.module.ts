import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), InputTextModule, ButtonModule, PasswordModule, FormsModule, ReactiveFormsModule],
    providers: [MessageService],
    declarations: [LoginComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [LoginComponent]
})

export class UsersModule {}
