import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { BannerComponent } from './components/banner/banner.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [CommonModule, ButtonModule],
    declarations: [BannerComponent, SliderComponent],
    exports: [BannerComponent, SliderComponent]
})
export class UiModule {}
