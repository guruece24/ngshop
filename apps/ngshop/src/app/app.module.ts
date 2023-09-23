import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { StoreModule } from '@ngrx/store';

import { HomePageComponent } from './pages/home-page/home-page.component';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';

import { UiModule } from '@bluebits/ui';
import { ProductsModule } from '@bluebits/products';
import { UsersModule } from '@bluebits/users';
import { OrdersModule } from '@bluebits/orders';

import { AccordionModule } from 'primeng/accordion';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'primeng/avatar';
import { MessageService } from 'primeng/api';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'products',
        component: HomePageComponent
    }
];

@NgModule({
    declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        ProductsModule,
        UiModule,
        AccordionModule,
        ScrollPanelModule,
        OrdersModule,
        AvatarModule,
        UsersModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
    ],
    providers: [MessageService],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [NavComponent]
})
export class AppModule {}
