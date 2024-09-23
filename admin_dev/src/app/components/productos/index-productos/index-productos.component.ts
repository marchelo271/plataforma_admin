import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import * as fs from 'file-saver';

import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;
declare var jQuery:any ; 
declare var $: any ; 

@Component({
  selector: 'app-index-productos',
  templateUrl: './index-productos.component.html',
  styleUrls: ['./index-productos.component.css']
})
export class IndexProductosComponent implements OnInit {

  public load_data= true; 
  public filtro: string='';
  public token;
  public productos: Array<any> = []; 
  public arr_productos: Array<any> = [];
  public url;
  public page= 1; 
  public pageSize = 20; 
  public load_btn = false; 

  constructor( private _productoService : ProductoService,
                             
    ){
      this.token = localStorage.getItem('token');
      this.url = GLOBAL.url; 
  }

  ngOnInit(): void {
       this.init_data(); 
  }
  
    init_data(){
      this._productoService.listar_producto_admin(this.filtro, this.token).subscribe({
        next:(response)=>{
            this.productos = response.data; 
            this.productos.forEach(element =>{
               this.arr_productos.push({
                  titulo: element.titulo,
                  stock: element.stock, 
                  precio: element.precio, 
                  categoria: element.categoria, 
                  Nventas: element.Nventas
               });
            });
            console.log(this.arr_productos);
            this.load_data = false; 
                
          }
        ,error:(error)=>{
                   console.log(error);
             }
       });
    }

   filtrar(){
      if(this.filtro){
       this.init_data(); 
      }else{
        iziToast.show({
          title:'ERROR:',
          titleColor:'red',
          class: 'text-danger',
          position:'topRight',
          message:'Ponga un filtro para hacer la busqueda'
      }); 
      }
   }

   resetear(){
       this.filtro='';
       this.init_data(); 
   } 

   eliminar(id:any){
    this.load_btn = true;
    this._productoService.eliminar_producto_admin(id, this.token).subscribe({
      next:(response)=>{
           iziToast.show({
           title:'SUCCESS:',
           titleColor:'#1DC74C',
           color:'#FFF',
           class: 'text-success',
           position:'topRight',
           message:'Se elimino correctamente el producto'
 }); 
 
       $('#delete-'+id).modal('hide'); 
       $('.modal-backdrop').removeClass('show'); 

       this.init_data();
       this.load_btn = false;
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
        message:'Hubo un error en el servidor , no se pudo eliminar el producto'
}); 
    } 
    });
   }


  


}
