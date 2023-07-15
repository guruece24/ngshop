import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
    styles: []
})

export class LoginComponent implements OnInit {
    loginFormGroup: FormGroup;
    isSubmitted: boolean = false;
    value!: string;
    authError = false;
    authMessage = 'Email or Password are wrong';

    constructor(
        private formBuilder: FormBuilder,
        private auth: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._initLoginForm();
    }

    private _initLoginForm() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.loginFormGroup.invalid) return;

        this.auth.login(this.loginForm.email.value, this.loginForm.password.value).subscribe({
            next: (user) => {
                this.authError = false;
            },
            error: (error: HttpErrorResponse) => {
                this.authError = true;
                if (error.status != 400) {
                    this.authMessage = 'Error in the server! Please try again later!';
                }
            },
            complete: () => setTimeout(() => this.router.navigate(['/products']), 2000)
        });
    }

    get loginForm() {
        return this.loginFormGroup.controls;
    }
}
