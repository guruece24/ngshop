import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
//import { Routes, RouterModule } from '@angular/router';
//import { Location } from '@angular/common';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted = false;
    editmode = false;
    currentCategoryId: string;

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private router: Router,
        private route: ActivatedRoute // private location: Location,
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['#fff']
        });

        this._checkEditMode();
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }

        const category: Category = {
            id: this.currentCategoryId,
            name: this.categoryForm.name.value,
            icon: this.categoryForm.icon.value,
            color: this.categoryForm.color.value
        };

        if (this.editmode) {
            //console.log(this.editmode);
            this._updateCategory(category);
        } else {
            this._addCategory(category);
        }
    }

    _addCategory(category: Category) {
        this.categoriesService.createCategory(category).subscribe({
            next: (category: Category) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Category ${category.name} is Created!`
                });
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No Category Created!'
                });
            },
            complete: () => setTimeout(() => this.router.navigate(['/categories']), 2000)
            // complete: () =>{ timer(2000)
            // .toPromise()
            // .then(() => {
            //   this.location.back();
            // });}
        });
    }

    _updateCategory(category: Category) {
        this.categoriesService.updateCategoy(category).subscribe({
            next: (category: Category) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Category ${category.name} is updated!`
                });
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No Category Updated!'
                });
            },
            complete: () => setTimeout(() => this.router.navigate(['/categories']), 2000)
        });
    }

    get categoryForm() {
        return this.form.controls;
    }

    onCancel() {
        this.router.navigate(['/categories']);
    }

    _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.editmode = true;
                this.currentCategoryId = params.id;
                this.categoriesService.getCategoryById(params.id).subscribe((category) => {
                    this.categoryForm.name.setValue(category.name);
                    this.categoryForm.icon.setValue(category.icon);
                    this.categoryForm.color.setValue(category.color);
                });
            }
        });
    }
}
