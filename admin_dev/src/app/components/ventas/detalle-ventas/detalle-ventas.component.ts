import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-detalle-ventas',
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.css']
})
export class DetalleVentasComponent implements OnInit{
  public rating = 0; 
  public url; 
  public token;
  public detalle: Array<any> = []; 
  public load_data = true;
  public orden: any = {};
  public id:any;
  public review:any ={}; 
  
  constructor(
    private _adminService: AdminService,
    private _route: ActivatedRoute
 ){
    this.token = localStorage.getItem('token');   
    this.url = GLOBAL.url; 
    this._route.params.subscribe(
      params =>{
         this.id = params['id'];
         this.init_Data();
      }
    );
 }
  ngOnInit(): void {
    
  }

  init_Data(){
    this._adminService.obtener_detalles_solicitudes_cliente(this.id, this.token).subscribe({
      next:(response)=>{
        if(response.data != undefined){
          this.orden = response.data; 
          this.detalle = response.detalles; 
          this.load_data = false ; 
        } else  {
           this.orden = undefined; 
        }
         console.log(this.orden); 
         console.log(this.detalle);  
      }
     });
  }
}
