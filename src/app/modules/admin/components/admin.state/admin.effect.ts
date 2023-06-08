import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import * as userAction from '../admin.state/admin.action'
import { Injectable } from '@angular/core';
import { ServiecesService } from '../../../../service/servieces.service'
import { of } from 'rxjs';

@Injectable()
export class AllUserEffect {

    constructor(
        private action$: Actions,
        private service: ServiecesService
    ) { }

    LoadUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(userAction.loadAllUser),
            mergeMap(() => {
                return this.service.getUserData().pipe(
                    
                    map((user) => userAction.loadAllUserSuccess({ alluser : Object.values(user) })),
                    catchError((error) => of(userAction.loadAllUserFailure({ error })))
                )
            }
            )
        )
    )
}