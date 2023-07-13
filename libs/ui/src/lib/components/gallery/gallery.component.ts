import { Component, Input } from '@angular/core';

@Component({
    selector: 'ui-gallery',
    templateUrl: './gallery.component.html',
    styles: []
})
export class GalleryComponent {
    @Input() images = [];
    @Input() selectedImageURL: any;

    get hasImages() {
        return this.images?.length > 0;
    }

    changeSelectedImage(imageUrl: string) {
        this.selectedImageURL = imageUrl;
    }
}
