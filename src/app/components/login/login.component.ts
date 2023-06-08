import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiecesService } from '../../service/servieces.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  submit: boolean = false
  constructor(private fb: FormBuilder, private service: ServiecesService, private router: Router) { }

  data = this.fb.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$")]]
  })

  EmailerrorMessg!: string
  PasErrorMessg!: string

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
    this.service.loginUser(loginData).subscribe((response) => {
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
        this.router.navigate(['/'])
        localStorage.setItem('userId', response.id);
        localStorage.setItem('token', response.jwtToken);

      }
    },
      (error) => {
        console.log(error);
      }
    )
  }


}
