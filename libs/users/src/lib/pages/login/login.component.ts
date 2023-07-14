import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
    styles: []
})


export class LoginComponent implements OnInit {
    loginFormGroup: FormGroup;
    isSubmitted: boolean = false;
    value!: string;

    constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

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

        this.auth.login(this.loginForm.email.value, this.loginForm.password.value).subscribe((user) =>{
            console.log(user);
        });
    }

    get loginForm() {
        return this.loginFormGroup.controls;
    }
}
