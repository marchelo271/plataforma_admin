import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

declare var iziToast: any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit, OnDestroy{
   
  public cliente: any = {
    genero:''
  }; 
  public token:any;
  private subscription: Subscription | null = null;
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

  ngOnDestroy(): void {
    if (this.subscription) {
     this.subscription.unsubscribe();
  }
}
 

  registro(registroForm:NgForm){
    if(registroForm.valid){
        this.btn_load = true;
        let data = this.cliente; 
        let token = this.token;
        this.subscription = this._clienteService.registro_cliente_admin(data, token).subscribe({
        next:(response)=>{
              console.log(response); 

               iziToast.show({
               title:'SUCCESS:',
               titleColor:'#1DC74C',
              color:'#FFF',
              class: 'text-success',
              position:'topRight',
              message:'Se registro correctamente el nuevo cliente'
    });
       this.cliente = {
         genero:'',
         nombre:'', 
         apellidos:'', 
         f_nacimiento:'',
         telefono:'', 
         ci:'' 
       }
       this.btn_load = true; 
       this._router.navigate(['/panel/clientes']);

             
             }
      ,error:(error)=>{
         console.log(error);
      } 
    });

    } else {
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
