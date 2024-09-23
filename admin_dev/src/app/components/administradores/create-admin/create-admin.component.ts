import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

declare var iziToast: any;


@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrl: './create-admin.component.css'
})
export class CreateAdminComponent implements OnInit {

  public admin: any = {};
  public pass1 = "";
  public confirm_pass =""; 
  public token:any;
  public btn_load = false;


  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService, 
    private _router : Router
  ){
    this.token= this._adminService.getToken(); 
  }

  ngOnInit(): void {
    
  }

  registro(registroForm:NgForm){
    if(registroForm.valid && this.pass1 === this.confirm_pass){
        this.btn_load = true;
        let data = this.admin; 
        this.admin.password = this.pass1;
        this._adminService.registro_admin(data).subscribe({
        next:(response)=>{
              console.log(response); 

              iziToast.show({
              title:'SUCCESS:',
              titleColor:'#1DC74C',
              color:'#FFF',
              class: 'text-success',
              position:'topRight',
              message:response.message
    });
       this.admin = {
         rol:'',
         nombre:'',
         email:'', 
         apellidos:'', 
         password:'',
         telefono:'', 
         ci:'' 
       }
       this.pass1='';
       this.confirm_pass=''; 
       this.btn_load = false; 
       this._router.navigate(['/panel/administradores']);

             
             }
      ,error:(error)=>{
         console.log(error);
      } 
    });

    } else {
       if(this.pass1 !== this.confirm_pass){
        alert('Las contraseñas no coinciden');
       }
      iziToast.show({
        title:'ERROR:',
        titleColor:'red',
        class: 'text-danger',
        position:'topRight',
        message:'los datos del formulario no son validos'
    });
    }
  }

}
