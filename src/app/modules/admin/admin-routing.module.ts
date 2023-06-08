import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminAddUserComponent } from './components/admin-add-user/admin-add-user.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminEditUserComponent } from './components/admin-edit-user/admin-edit-user.component';

const routes: Routes = [
  {path:'',component:AdminComponent,children:[

    {path:'',redirectTo:'/admin/admin-dash',pathMatch:'full'},
    {path :'admin-dash',component:AdminDashboardComponent},
    {path:'admin-login',component:AdminLoginComponent},
    {path:'admin-addUser',component:AdminAddUserComponent},
    {path:'admin-editUser',component:AdminEditUserComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
