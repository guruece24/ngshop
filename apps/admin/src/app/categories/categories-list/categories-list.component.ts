import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';

// interface People {
//     firstname?: string;
//     lastname?: string;
//     age?: string;
// }

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit {
    categories: Category[] = [];

    //    categories = [
    //             {
    //                 id: 1,
    //                 name: 'category-1',
    //                 icon: 'icon-1',
    //             },
    //             {
    //                 id: 2,
    //                 name: 'category-2',
    //                 icon: 'icon-2',
    //             },
    //             {
    //                 id: 3,
    //                 name: 'category-3',
    //                 icon: 'icon-3',
    //             }
    //         ];

    // tableData: People[] = [];
    // cols: any[] = [];

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private categoriesService: CategoriesService
    ) {}

    ngOnInit(): void {
        this._getCategories();

        // this.cols = [
        //     {
        //         field: 'firstname',
        //         header: 'First Name'
        //     },
        //     {
        //         field: 'lastname',
        //         header: 'Last Name'
        //     },
        //     {
        //         field: 'age',
        //         header: 'Age'
        //     },
        // ];
        // this.tableData = [
        //     {
        //         firstname: 'David',
        //         lastname: 'ace',
        //         age: '40',
        //     },
        //     {
        //         firstname: 'AJne',
        //         lastname: 'west',
        //         age: '40',
        //     },
        //     {
        //         firstname: 'Mak',
        //         lastname: 'Lame',
        //         age: '40',
        //     },
        //     {
        //         firstname: 'Peter',
        //         lastname: 'raw',
        //         age: '40',
        //     },
        //     {
        //         firstname: 'Kane',
        //         lastname: 'James',
        //         age: '40',
        //     },
        //     {
        //         firstname: 'Peter',
        //         lastname: 'raw',
        //         age: '40',
        //     },
        //     {
        //         firstname: 'Kane',
        //         lastname: 'James',
        //         age: '40',
        //     },
        //     {
        //         firstname: 'Peter',
        //         lastname: 'raw',
        //         age: '40',
        //     },
        //     {
        //         firstname: 'Kane',
        //         lastname: 'James',
        //         age: '40',
        //     },
        //     {
        //         firstname: 'Peter',
        //         lastname: 'raw',
        //         age: '40',
        //     },
        //     {
        //         firstname: 'Kane',
        //         lastname: 'James',
        //         age: '40',
        //     },
        //     {
        //         firstname: 'Peter',
        //         lastname: 'raw',
        //         age: '40',
        //     },
        //     {
        //         firstname: 'Kane',
        //         lastname: 'James',
        //         age: '40',
        //     },
        // ];

        // console.log(this.tableData);
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((cats) => {
            this.categories = cats;
            console.log(this.categories);
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
}
