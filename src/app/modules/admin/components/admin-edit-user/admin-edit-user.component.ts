import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ServiecesService } from 'src/app/service/servieces.service';
import { selectAllUserData } from '../admin.state/admin.selector'

  @Component({
    selector: 'app-admin-edit-user',
    templateUrl: './admin-edit-user.component.html',
    styleUrls: ['./admin-edit-user.component.css']
  })
  export class AdminEditUserComponent implements OnInit {
    submit: boolean = false
    constructor(private fb: FormBuilder, private service: ServiecesService, private toast: ToastrService, private router: Router, private store: Store) { }

    data = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', Validators.email],
    })

    id:any = this.service.id

    name:string | undefined;
    email:string | undefined


    

    ngOnInit(): void {
      this.store.pipe(select(selectAllUserData)).subscribe((res)=>{
        const data = Object.values(res).find((_:any)=>_._id === this.id)
        this.name = data?.name
        this.email = data?.email
        
      })
    }


    ErrorMessage!: string
    ConError!: string
    incorrect: boolean = false

    onSubmit() {
      this.submit = true
      const { name, email } = this.data.value
     
        if (name?.trim()  && email?.trim() && name && email ) {
          this.CreateUser(this.data.value)
        }else{
          this.ErrorMessage = "Field is Empty"
          setTimeout(() => {
            this.ErrorMessage = ''
          }, 3000);
        }

      

    }

    CreateUser(userData: any): void {
      this.service.getuserEdit(userData)
        .subscribe(
          (response) => {
            if (response.success === true) {
              this.toast.success("User Updated !", "Success")
              setTimeout(() => {
                this.router.navigate(['/admin'])
              }, 1000);
            } 
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }
