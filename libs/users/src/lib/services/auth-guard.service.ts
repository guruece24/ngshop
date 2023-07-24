import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard {
    constructor(private router: Router, private localStorageToken: LocalstorageService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.localStorageToken.getToken();

        if (token) {
            const tokendecode = JSON.parse(atob(token.split('.')[1]));
            //const tokendecode = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));

            if (tokendecode.isAdmin && !this._isTokenExpired(tokendecode.exp)) {
                //console.log(this._isTokenExpired(tokendecode.exp));
                return true;
            }
        }

        this.router.navigate(['/login']);
        return false;
    }

    private _isTokenExpired(exp: number): boolean {
        //console.log(Math.floor(new Date().getTime()) + ' currentTime');
        //console.log(Math.floor(exp) + 'expiredTime');
        //console.log(Math.floor(exp * 1000) + 'expiredTime');
        //console.log(Math.floor(new Date().getTime() / 1000));
        //return Math.floor(new Date().getTime()) >= exp;

        return Math.floor(new Date().getTime()) >= exp * 1000;
    }
}
