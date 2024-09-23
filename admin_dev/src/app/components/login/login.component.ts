import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

declare var jQuery:any ; 
declare var $: any ; 
declare var iziToast: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
   public user: any = {   
   }; 
   public usuario : any = {};
   public token : any = '';
   private subscription: Subscription | null = null;;
  
  constructor(
    private _adminService: AdminService,
    private _router : Router
   ){
      this.token = this._adminService.getToken(); 
   }

   ngOnInit(): void {
         if(this.token){
            this._router.navigate(['/'])
         }  else {
            //se mantiene en el componente de login 
         } 
   }
   login(loginForm: NgForm){
      if(loginForm.valid){
         console.log(this.user); 
         
         let data= {
            email: this.user.email,
            password:this.user.password
         }
        this.subscription=  this._adminService.login_admin(data).subscribe({
           next:(response)=>{
              if(response.data == undefined){
               iziToast.show({
                  title:'ERROR:',
                  titleColor:'red',
                  class: 'text-danger',
                  position:'topRight',
                  message:response.message 
              });
              }  else  {
                  this.usuario = response.data; 
                  localStorage.setItem('token', response.token); 
                  localStorage.setItem('_id', response.data._id); 
                  this._router.navigate(['/']); 
              }
            console.log(response)
           }
         ,error:(error)=>{
            console.log(error);
         } 
         });
         
      }else{
        iziToast.show({
            title:'ERROR:',
            titleColor:'red',
            class: 'text-danger',
            position:'topRight',
            message:'los datos del formulario no son validos'
        }); 
      }
   }

   ngOnDestroy() {
    if (this.subscription) {
       this.subscription.unsubscribe();
    }
 }
 

}
