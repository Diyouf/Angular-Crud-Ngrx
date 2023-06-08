import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiecesService } from '../../../../service/servieces.service'

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  submit: boolean = false
  constructor(private fb: FormBuilder, private service: ServiecesService, private router: Router) { }

  data = this.fb.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$")]]
  })

  EmailerrorMessg!: string
  PasErrorMessg!: string
  Adminmessage!: string

  // AuthLogin() {
  //   const token = localStorage.getItem('token');
  //   if(token){
  //     this.router.navigate(['/user'])
  //     return true 
  //   }else{
  //     return false
  //   }

  // }

  onSubmit() {
    this.submit = true
    const { email, password } = this.data.value
    if (email && password) {
      this.loginData(this.data.value)
    }
  }

  loginData(loginData: any) {
    this.service.loginAdmin(loginData).subscribe((response) => {
      if (!response.Adminmessage) {
      if (response.Emailmessage) {
        this.EmailerrorMessg = response.Emailmessage
        setTimeout(() => {
          this.EmailerrorMessg = ''
        }, 3000);
      } else if (response.Passmessage) {
        this.PasErrorMessg = response.Passmessage
        setTimeout(() => {
          this.PasErrorMessg = ''
        }, 3000);
      } else {
        localStorage.setItem('Admintoken', response.jwtToken);
        this.router.navigate(['/admin'])
      }
    }else{
      this.Adminmessage = response.Adminmessage
      setTimeout(() => {
        this.Adminmessage = ''
      }, 3000);
    }
    },
      (error) => {
        console.log(error);
      }
    )
  }

}
