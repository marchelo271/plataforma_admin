import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

declare var iziToast: any;
declare var jQuery:any ; 
declare var $: any ; 

@Component({
  selector: 'app-index-administrador',
  templateUrl: './index-administrador.component.html',
  styleUrl: './index-administrador.component.css'
})
export class IndexAdministradorComponent implements OnInit{
  
  public admins : Array<any>= []; 
 
  public filtro_apellidos= '';
  public filtro_correo=''; 
  public page= 1; 
  public pageSize = 20; 
  public token;
  public load_data = true; 
  
  
  constructor(
    private _adminService: AdminService
  ){
    this.token = this._adminService.getToken(); 
   }

   ngOnInit(): void {
    this.init_Data(); 
   }

   init_Data(){
      this._adminService.listar_todos_admin_filtro(null, null, this.token).subscribe({
       next:(response)=>{
              this.admins = response.data;
              this.load_data = false;  
            }
     ,error:(error)=>{
        console.log(error+'este es el error del listado de clientes de inicio ');
     } 
     });
  } 
 
  filtro(tipo:any){
      
    if(tipo=='apellidos'){
      if(this.filtro_apellidos){
         this.load_data = true;
           this._adminService.listar_todos_admin_filtro(tipo, this.filtro_apellidos, this.token).subscribe({
            next:(response)=>{
                   this.admins = response.data;
                   this.load_data= false;  
                 }
          ,error:(error)=>{
             console.log(error+'este es el error del listado de admins ');
          } 
          });
      } else {
          this.init_Data(); 
      }
     
    }else if (tipo=='correo'){ 
      if(this.filtro_correo){
         this.load_data= true; 
          this._adminService.listar_todos_admin_filtro(tipo, this.filtro_correo, this.token ).subscribe({
            next:(response)=>{
                   this.admins = response.data;
                   this.load_data=false;  
                 }
          ,error:(error)=>{
             console.log(error+'este es el error del listado de admins ');
          } 
          });
      } else {
         this.init_Data(); 
      }
     
    }
}

eliminar(id:any){
   this._adminService.eliminar_administrador(id, this.token).subscribe({
     next:(response)=>{
        iziToast.show({
          title:'SUCCESS:',
          titleColor:'#1DC74C',
          color:'#FFF',
          class: 'text-success',
          position:'topRight',
          message: response.message
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
