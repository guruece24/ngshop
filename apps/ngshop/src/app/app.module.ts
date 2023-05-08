import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, ProductListComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
