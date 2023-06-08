import { createAction, props } from '@ngrx/store';
import { getUser } from '../admin.state/admin.interface'

export const loadAllUser = createAction('[AllUser] Load All User');

export const loadAllUserSuccess = createAction('[AllUser] Load AllUser Success', props<{ alluser: getUser[] }>());

export const loadAllUserFailure = createAction('[User] Load User Failure', props<{ error: string }>());
