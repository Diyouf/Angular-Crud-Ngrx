import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import * as userAction from './state.action'
import { Injectable, OnInit } from '@angular/core';
import { ServiecesService } from '../service/servieces.service'
import { of } from 'rxjs';

@Injectable()
export class userEffect implements OnInit{

    constructor(
        private action$: Actions,
        private service: ServiecesService
    ) { }

    
    id = localStorage.getItem('userId')
    
    ngOnInit(): void {     
    }

    

    loginRequest$ = createEffect(() =>
        this.action$.pipe(
            ofType(userAction.loadUser),
            mergeMap(() => {
                return this.service.fetchUserData(this.id).pipe(
                    map((user) => userAction.loadUserSuccess({ user : user })),
                    catchError((error) => of(userAction.loadUserFailure({ error })))
                )
            }
            )
        )
    )
}