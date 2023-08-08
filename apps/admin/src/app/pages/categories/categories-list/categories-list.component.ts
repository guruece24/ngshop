import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit {
    categories: Category[] = [];

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private categoriesService: CategoriesService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getCategories();
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }

    private deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesService.deleteCategory(categoryId).subscribe({
                    next: () => {
                        this._getCategories();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Category is deleted!'
                        });
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'No Category deleted!'
                        });
                    }
                });
            },
            reject: () => {
                this._getCategories();
            }
        });
    }

    private updateCategory(categoryId: string) {
        this.router.navigateByUrl(`categories/form/${categoryId}`);
    }
}
