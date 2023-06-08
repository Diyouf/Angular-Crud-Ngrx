import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store'
import { _userGetReducer } from './components/admin.state/admin.reducer'
import { AllUserEffect } from './components/admin.state/admin.effect';
import { AdminAddUserComponent } from './components/admin-add-user/admin-add-user.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminEditUserComponent } from './components/admin-edit-user/admin-edit-user.component';


@NgModule({
  declarations: [
    AdminNavbarComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    AdminAddUserComponent,
    AdminComponent,
    AdminEditUserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('Alluser',_userGetReducer),
    EffectsModule.forFeature([AllUserEffect]),
  ]
})
export class AdminModule { }
