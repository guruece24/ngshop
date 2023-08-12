import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { BannerComponent } from './components/banner/banner.component';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MessageService } from 'primeng/api';


@NgModule({
    imports: [CommonModule, ButtonModule],
    providers: [MessageService],
    declarations: [BannerComponent, SliderComponent, GalleryComponent],
    exports: [BannerComponent, SliderComponent, GalleryComponent]
})
export class UiModule {}
