import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

declare var iziToast: any;
declare var jQuery:any ; 
declare var $: any ; 

@Component({
  selector: 'app-index-ventas',
  templateUrl: './index-ventas.component.html',
  styleUrls: ['./index-ventas.component.css']
})
export class IndexVentasComponent implements OnInit {
  public token; 
  public desde:any;
  public hasta:any;  
  public solicitudes: Array<any> = []; 
  public page= 1; 
  public pageSize = 15; 
  public load_btn = false; 

  constructor(
      private _adminService: AdminService
  ){
    this.token = localStorage.getItem('token'); 
  }
  ngOnInit(): void {
     this._adminService.obtener_solicitudes_admin(this.desde, this.hasta, this.token).subscribe({
       next:(response)=> {
          this.solicitudes = response.data;    
       }
     });
  }

  filtrar(){
    this._adminService.obtener_solicitudes_admin(this.desde, this.hasta, this.token).subscribe({
      next:(response)=> {
           this.solicitudes = response.data;
      }
    });
  }

  eliminar(id:any){
    this.load_btn = true;
    this._adminService.eliminar_solicitud_admin(id, this.token).subscribe({
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
        message:'Hubo un error en el servidor , no se pudo eliminar la solicitud'
}); 
    } 
    });
   }



}
