import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiecesService } from '../../../../service/servieces.service'
import { getUser } from '../admin.state/admin.interface';
import { Store, select } from '@ngrx/store';
import { loadAllUser } from '../admin.state/admin.action'
import { selectAllUserData } from '../admin.state/admin.selector'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private router: Router, private service: ServiecesService, private store: Store<getUser[]>) { }

  Alluser$!: Observable<getUser[]>

  isLogin(): boolean {
    return this.router.url.includes('admin/admin-login')
  }

  Adduser(): boolean {
    return this.router.url.includes('admin/admin-addUser')
  }

  ngOnInit(): void {
    if(!localStorage.getItem('Admintoken')){
      this.router.navigate(['/admin/admin-login'])
    }
    this.store.dispatch((loadAllUser()))
    this.Alluser$ = this.store.pipe(select(selectAllUserData))

  }

  deleteUser(id: any) {
    const con = confirm("do you want to remove this user")

    if (con) {
      this.service.userDelete(id).subscribe((res) => {
        if (res.message === true) {
          this.store.dispatch((loadAllUser()))
        }
      })
    }

  }

  addUser(){
    this.router.navigate(['/admin/admin-addUser'])
  }

  editUser(id:any){

    this.router.navigate(['/admin/admin-editUser'])
    return this.service.setId(id)

  }



}
