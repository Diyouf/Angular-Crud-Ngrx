import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ServiecesService } from '../../service/servieces.service'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
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
        this.registerUser(this.data.value)
      }
    } else {
      this.incorrect = true
      setTimeout(() => {
        this.incorrect = false
      }, 3000)
    }

  }

  registerUser(userData: any): void {
    this.service.registerUser(userData)
      .subscribe(
        (response) => {
          if (response.success === true) {
             this.toast.success("Registration successfull !","Success")
             setTimeout(() => {
               this.router.navigate(['/login'])
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
