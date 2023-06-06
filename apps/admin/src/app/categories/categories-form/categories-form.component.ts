import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/products';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted = false;

    constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService) {}

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

        this.categoriesService.createCategory(category).subscribe();

        console.log(this.form.controls.name.value);
        console.log(this.form.controls.icon.value);
    }

    get categoryForm() {
        return this.form.controls;
    }
}
