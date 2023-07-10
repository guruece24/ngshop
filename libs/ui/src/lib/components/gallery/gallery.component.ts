import { Component, Input, OnInit } from '@angular/core';
// import { Product } from '@bluebits/products';

@Component({
    selector: 'ui-gallery',
    templateUrl: './gallery.component.html',
    styles: []
})

export class GalleryComponent implements OnInit {
    @Input() pImages = [];
    @Input() selectedImage:any;
   // @Input() product: Product = new Product();
    //selectedImage = '';

   constructor() {
    this.pImages = [];
    console.log(this.pImages);
}

    ngOnInit(): void {
        console.log(this.pImages);
        //if (this.hasImages) {
            // this.selectedImage='http://localhost:3000/public/uploads/5f15da135420d44456ed8e9e-1604665545872.jpeg';
            //this.selectedImage = this.images[1];
            //console.log(this.images);
        //}
    }

    get hasImages() {
        return this.pImages?.length > 0;
    }
}
