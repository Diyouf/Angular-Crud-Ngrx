import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { loadUser } from '../../state/state.action'
import { selectUserData } from '../../state/state.selector'
import { Observable } from 'rxjs';
import { UserData } from 'src/app/state/state.interface';
import { ServiecesService } from '../../service/servieces.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private store: Store<UserData>,private service:ServiecesService ) {
  }
  
  user$! :Observable<UserData[]>
  image$! :string
  imageUploaded:boolean = false


  user: any;
 
  
  ngOnInit(): void {
    this.store.dispatch(loadUser())
    this.user$ = this.store.pipe(select(selectUserData)) 
    this.user$.subscribe((res)=>{
      if(res[0].image){
        this.imageUploaded=true
       this.image$ = res[0].image
      }
      
      
    })   
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const NewFile:FormData = new FormData()
      NewFile.append('image', file, file.name)
      const id = localStorage.getItem('userId')    
      this.service.uploadImage(NewFile,id).subscribe((res)=>{
        if(res.hai == true)
        this.store.dispatch(loadUser())
      })
            
    }
  }
  
}
