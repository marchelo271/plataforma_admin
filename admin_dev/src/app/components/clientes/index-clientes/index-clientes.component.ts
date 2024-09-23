import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

declare var iziToast: any;
declare var jQuery:any ; 
declare var $: any ; 

@Component({
  selector: 'app-index-clientes',
  templateUrl: './index-clientes.component.html',
  styleUrls: ['./index-clientes.component.css']
})
export class IndexClientesComponent implements OnInit, OnDestroy{
  
   public clientes : Array<any>= []; 
   private subscription: Subscription | null = null;
   public filtro_apellidos= '';
   public filtro_correo=''; 
   public page= 1; 
   public pageSize = 20; 
   public token;
   public load_data = true; 

  constructor(
    private _clienteService : ClienteService ,
    private _adminService: AdminService
  ){
    this.token = this._adminService.getToken(); 
    
  }
  ngOnInit(): void {
      this.init_Data(); 
  }

 init_Data(){
   this.subscription=  this._clienteService.listar_clientes_filtro_admin(null, null, this.token).subscribe({
      next:(response)=>{
             this.clientes = response.data;
             this.load_data = false;  
           }
    ,error:(error)=>{
       console.log(error+'este es el error del listado de clientes de inicio ');
    } 
    });
 }
  
  ngOnDestroy(): void {
        if (this.subscription) {
         this.subscription.unsubscribe();
      }
   }

   filtro(tipo:any){
      
       if(tipo=='apellidos'){
         if(this.filtro_apellidos){
            this.load_data = true;
            this.subscription=  this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_apellidos, this.token).subscribe({
               next:(response)=>{
                      this.clientes = response.data;
                      this.load_data= false;  
                    }
             ,error:(error)=>{
                console.log(error+'este es el error del listado de clientes ');
             } 
             });
         } else {
             this.init_Data(); 
         }
        
       }else if (tipo=='correo'){ 
         if(this.filtro_correo){
            this.load_data= true; 
            this.subscription=  this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_correo, this.token ).subscribe({
               next:(response)=>{
                      this.clientes = response.data;
                      this.load_data=false;  
                    }
             ,error:(error)=>{
                console.log(error+'este es el error del listado de clientes ');
             } 
             });
         } else {
            this.init_Data(); 
         }
        
       }
 }

 eliminar(id:any){
   this.subscription=  this._clienteService.eliminar_cliente_admin(id, this.token).subscribe({
      next:(response)=>{
         iziToast.show({
            title:'SUCCESS:',
            titleColor:'#1DC74C',
           color:'#FFF',
           class: 'text-success',
           position:'topRight',
           message:'Se elimino correctamente el cliente'
 }); 
 
       $('#delete-'+id).modal('hide'); 
       $('.modal-backdrop').removeClass('show'); 

       this.init_Data();

           }
    ,error:(error)=>{
       console.log(error);
    } 
    });
 }
}
