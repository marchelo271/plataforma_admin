import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  
  public token;
  public id;
  public user : any = undefined; 
  public user_lc: any ={}; 
  public url; 
  constructor(
    private _router: Router,
    private _adminService: AdminService

  ){

    this.url= GLOBAL.url; 
    this.token = localStorage.getItem('token'); 
    this.id = localStorage.getItem ('_id'); 

    if(this.token){
      this._adminService.obtener_admin(this.id, this.token).subscribe({
        next:(response)=>{
            this.user = response.data; 
            localStorage.setItem('user_data', JSON.stringify(this.user));
            const userDataString = localStorage.getItem('user_data');

      if (userDataString) {
        this.user_lc = JSON.parse(userDataString);
          
      } else {
        this.user_lc = undefined;
      }
        }
        ,error:(error)=>{
           console.log(error);
           this.user  = undefined; 
        } 
    });
     }
  }

  ngOnInit(): void { 
     
  }



  logout(){
    window.location.reload();
    localStorage.clear(); 
    this._router.navigate(['/']);
}

}
