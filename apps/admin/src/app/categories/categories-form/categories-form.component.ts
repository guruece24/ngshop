//import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
//import { Routes, RouterModule } from '@angular/router';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted = false;

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
       // private location: Location,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required]
        });
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }

        const category: Category = {
            name: this.categoryForm.name.value,
            icon: this.categoryForm.icon.value
        };

        this.categoriesService.createCategory(category).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Category is added!'
                });
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No Category Created!'
                });
            },
            // complete: () =>{ timer(2000)
            // .toPromise()
            // .then(() => {
            //   this.location.back();
            // });}
            complete: () => setTimeout(() => this.router.navigate(['/categories']), 2000)
        });

        // console.log(this.form.controls.name.value);
        // console.log(this.form.controls.icon.value);
    }

    get categoryForm() {
        return this.form.controls;
    }
}
