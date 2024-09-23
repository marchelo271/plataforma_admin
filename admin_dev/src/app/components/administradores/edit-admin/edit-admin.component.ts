import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

declare var iziToast: any;

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrl: './edit-admin.component.css'
})
export class EditAdminComponent implements OnInit {
  public admin: any = {}; 
  public pass1='';
  public confirm_pass='';
  public id : any; 
  public token; 
  public btn_load = false;
  public load_data = true; 

  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router
  ){
    this.token = this._adminService.getToken(); 
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
         this.id = params['id'];
         this._adminService.obtener_admin(this.id, this.token).subscribe({ 
         next:(response)=>{
           console.log(response); 
           if(response.data == undefined){
                this.admin = undefined; 
                this.load_data= false;
           }else{
               this.admin = response.data;
               this.load_data = false;
                
           }
         }, 
          error:(error)=>{
            console.log(error); 
          }
       });
     }
   )
  }

  actualizar(updateForm:NgForm){
    if(updateForm.valid && this.pass1 === this.confirm_pass){
       this.btn_load = true;
       this.admin.password = this.pass1;
       this._adminService.actualizar_admin(this.id, this.admin, this.token).subscribe({ 
         next:(response)=>{
           iziToast.show({
             title:'SUCCESS:',
             titleColor:'#1DC74C',
            color:'#FFF',
            class: 'text-success',
            position:'topRight',
            message:'Se Actualizó correctamente el admin' });

            this.btn_load = false; 
            this._router.navigate(['/panel/administradores']);

         }, 
          error:(error)=>{
              console.log(error)
          }
       });
    }else {
       if(this.pass1 !== this.confirm_pass){
         alert('La nueva contraseña debe ser confirmada')
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
