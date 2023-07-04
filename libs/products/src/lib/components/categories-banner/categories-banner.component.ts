import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'products-categories-banner',
    templateUrl: './categories-banner.component.html',
    styles: []
})

export class CategoriesBannerComponent implements OnInit, OnDestroy {
    categories: Category[] = [];
    endSubs$: Subject<any> = new Subject();

    constructor(private categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((cats) => {
                this.categories = cats;
                //console.log(this.categories);
            });
    }

    ngOnDestroy(): void {
      this.endSubs$.next(0);
      this.endSubs$.complete();
    }
}
