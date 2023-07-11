import { Component, Input } from '@angular/core';
// import { Product } from '@bluebits/products';

@Component({
    selector: 'ui-gallery',
    templateUrl: './gallery.component.html',
    styles: []
})
export class GalleryComponent {
    @Input() images = [];
    @Input() selectedImageURL: any;

    // @Input() product: Product = new Product();
    //selectedImage = '';

    //    constructor() {
    //     this.images = [];
    //     console.log(this.images);
    // }

    //     ngOnInit(): void {
    //         console.log(this.images);
    //         //if (this.hasImages) {
    //             // this.selectedImage='http://localhost:3000/public/uploads/5f15da135420d44456ed8e9e-1604665545872.jpeg';
    //             //this.selectedImage = this.images[1];
    //             //console.log(this.images);
    //         //}
    //     }

        get hasImages() {
            return this.images?.length > 0;
        }

    changeSelectedImage(imageUrl: string) {
        this.selectedImageURL = imageUrl;
    }
}
