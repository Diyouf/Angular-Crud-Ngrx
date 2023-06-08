import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getUser } from '../modules/admin/components/admin.state/admin.interface'

@Injectable({
  providedIn: 'root'
})
export class ServiecesService {

  constructor(private http: HttpClient) { }

  private apiUrlRegister = 'http://localhost:3000/register'
  private apiUrLogin = 'http://localhost:3000/login'

  id:any

  setId(id:any){
    this.id = id
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlRegister, userData)
  }

  loginUser(loginData:any):Observable<any>{
    return this.http.post<any>(this.apiUrLogin,loginData)
  }

  getUserData():Observable<getUser[]>{
    return this.http.get<getUser[]>('http://localhost:3000/admin')
  }

  userDelete(id:any):Observable<any>{
    console.log(id);
    return this.http.delete<any>(`http://localhost:3000/userDelete/?id=${id}`)
  }

  fetchUserData(id:any):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/userData/?id=${id}`)
  }

  loginAdmin(adminData:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/admin/admin-login',adminData)
  }

  addUser(data:any):Observable<any>{
    // console.log(data);
    return this.http.post<any>('http://localhost:3000/admin/add-user',data)
  }


  getuserEdit(data:any):Observable<any>{
    return this.http.post<any>(`http://localhost:3000/admin/EditUser`,data)    
  }

  uploadImage(file:object,id:any){
    console.log(file);
    console.log(id);
    return this.http.post<any>(`http://localhost:3000/userImage/?id=${id}`,file)
  }

  
}
