import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

declare var iziToast: any;
declare var jQuery:any ; 
declare var $: any ; 

@Component({
  selector: 'app-index-contacto',
  templateUrl: './index-contacto.component.html',
  styleUrls: ['./index-contacto.component.css']
})
export class IndexContactoComponent implements OnInit{

  public load_btn = false; 
  public load_data = true; 
  public page= 1; 
  public pageSize = 10; 
  public mensajes : Array<any> = []; 
  public filtro :String = ''; 
  public token ; 

  constructor(
     private _adminService: AdminService
  ){
     this.token = localStorage.getItem('token');
   }


  ngOnInit(): void {
     this._adminService.obtener_mensajes_admin(this.token).subscribe ({
      next:(response)=>{
        this.mensajes = response.data; 
        this.load_data = false; 
      }
     })
  } 

  cerrar (id:any){
    this.load_btn = true; 
    this._adminService.cerrar_mensaje_admin(id,{data:undefined} ,this.token).subscribe({
      next:(response)=>{
         iziToast.show({
            title:'SUCCESS:',
            titleColor:'#1DC74C',
           color:'#FFF',
           class: 'text-success',
           position:'topRight',
           message:'Se cerro correctamente el mensaje'
 }); 
 
       $('#estadoModal-'+id).modal('hide'); 
       $('.modal-backdrop').removeClass('show'); 

       this._adminService.obtener_mensajes_admin(this.token).subscribe ({
        next:(response)=>{
          this.mensajes = response.data; 
          this.load_data = false; 
        }
       })
        this.load_btn = false; 
           }
    ,error:(error)=>{
       console.log(error);
    } 
    });
  }

  eliminar(id:any){
  
    this.load_btn = true;
    this._adminService.eliminar_mensaje_admin(id, this.token).subscribe({
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

       console.log(response.message); 
       this.load_btn = false;
       window.location.reload();
           }
    ,error:(error)=>{
       
       console.log(error);
       this.load_btn = false;
       iziToast.show({
        title:'SUCCESS:',
        titleColor:'#1DC74C',
        color:'#FFF',
        class: 'text-success',
        position:'topRight',
        message:'Hubo un error en el servidor , no se pudo eliminar el mensaje'
         }); 
    } 
    });
  
  }

}
