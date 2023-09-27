import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, concatMap } from 'rxjs';
import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import { UsersService } from '../services/users.service';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable()
export class UsersEffects {
    //  private actions$ = inject(Actions);

    constructor(
        private actions$: Actions,
        private localStorageService: LocalstorageService,
        private usersService: UsersService
    ) {}

    buildUserSession$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.buildUserSession),
            concatMap(() => {
                if (this.localStorageService.isValidToken()) {
                    const userId = this.localStorageService.getUserIdFromToken();
                    if (userId) {
                        return this.usersService.getUser(userId).pipe(
                            map((user) => {
                                return UsersActions.buildUserSessionSuccess({ user: user });
                            }),
                            catchError(() => of(UsersActions.buildUserSessionFailed()))
                        );
                    } else {
                        return of(UsersActions.buildUserSessionFailed());
                    }
                } else {
                    return of(UsersActions.buildUserSessionFailed());
                }
            })
        )
    );
}
