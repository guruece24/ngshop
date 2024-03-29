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
import { JwtInterceptor, UsersModule } from '@bluebits/users';
import { OrdersModule } from '@bluebits/orders';

import { AccordionModule } from 'primeng/accordion';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'primeng/avatar';
import { MessageService } from 'primeng/api';
import { EffectsModule } from '@ngrx/effects';

import { NgxStripeModule } from 'ngx-stripe';


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
        EffectsModule.forRoot([]),
        NgxStripeModule.forRoot('pk_test_51KHtJfSGLMk0b0PhICwTNUSjyLMMAn8dYJMUi60r1f2UGJg39Y9P70RQmKU7Dw8pm0fohgMzXX09231E7u36VVN0008OwSGkL5'),
    ],
    providers: [
        MessageService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [NavComponent]
})
export class AppModule {}
