import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiecesService } from 'src/app/service/servieces.service';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})
export class AdminAddUserComponent {

  submit: boolean = false
  constructor(private fb: FormBuilder, private service: ServiecesService,private toast : ToastrService,private router:Router) { }

  data = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$")]],
    Conpassword: ['', Validators.required]
  })

  ErrorMessage!: string
  ConError!: string
  incorrect: boolean = false

  onSubmit() {
    this.submit = true
    const { name, email, password, Conpassword } = this.data.value
    if (password === Conpassword) {
      if (name && email && password && Conpassword) {
        this.CreateUser(this.data.value)
      }
    } else {
      this.incorrect = true
      setTimeout(() => {
        this.incorrect = false
      }, 3000)
    }

  }

  CreateUser(userData: any): void {
    this.service.addUser(userData)
      .subscribe(
        (response) => {
          if (response.success === true) {
             this.toast.success("User Created !","Success")
             setTimeout(() => {
               this.router.navigate(['/admin'])
             }, 3000);
          } else {
            this.ErrorMessage = response.message;
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
