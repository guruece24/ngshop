import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService, CategoriesService, Product } from '@bluebits/products';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted = false;
    editmode = false;
    currentProductId: string;
    categories = [];
    imageDisplay: string | ArrayBuffer;

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private router: Router,
        private route: ActivatedRoute // private location: Location,
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._getCategories();
        this._checkEditMode();
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.form.invalid) return;

        const productFormData = new FormData();

        Object.keys(this.productForm).map((key) => {
            productFormData.append(key, this.productForm[key].value);
        });

        this._addProduct(productFormData);
    }

    onCancel() {}

    private _checkEditMode() {
        throw new Error('Method not implemented.');
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['', Validators.required],
            isFeatured: [false]
        });
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }

    onImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.form.patchValue({ image: file });
            this.form.get('image').updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result;
            };
            fileReader.readAsDataURL(file);
        }
    }

    _addProduct(productData: FormData) {
        this.productsService.createProduct(productData).subscribe({
            next: (product: Product) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Product ${product.name} is Created!`
                });
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No Product Created!'
                });
            },
            complete: () => setTimeout(() => this.router.navigate(['/categories']), 2000)
        });
    }

    get productForm() {
        return this.form.controls;
    }
}
