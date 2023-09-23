import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects {
    private actions$ = inject(Actions);

    buildUserSessionit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.buildUserSession),
            switchMap((user) => of(UsersActions.buildUserSessionSuccess({ user: user }))),
            catchError((error) => {
                console.error('Error', error);
                return of(UsersActions.buildUserSessionFailed());
            })
        )
    );
}
