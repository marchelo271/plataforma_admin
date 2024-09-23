import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
import { v4 as uuidv4 } from 'uuid';

declare var iziToast: any ; 
declare var jQuery:any ; 
declare var $: any ;

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit{
    
  public producto: any = {};
  public id: any;
  public token; 
  public load_data= true;
  public load_btn = false; 
  public load_btn_eliminar = false; 
  public file: File | null; 
  public url; 

 constructor(
    private _route : ActivatedRoute,
    private _productoService: ProductoService
 ){
   this.file = null;
   this.token = localStorage.getItem('token');
   this.url = GLOBAL.url; 
   this._route.params.subscribe(
     params=>{
        this.id = params['id'];
        this.init_data();
    }
  )
 }
    ngOnInit(): void {
      
    }

    init_data(){
      this._productoService.obtener_producto_admin(this.id, this.token).subscribe({ 
        next:(response)=>{
          console.log(response); 
          if(response.data == undefined){
               this.producto = undefined; 
               this.load_data= false;
          }else{
              this.producto = response.data;
              this.load_data = false;
              
          }
           console.log(this.producto); 

        }, 
         error:(error)=>{
           console.log(error); 
         }
      });
    }

    fileChangeEvent(event:any):void{
      var file; 
      if(event.target.files && event.target.files[0]){
         file = <File>event.target.files[0]; 
         
 
         if(file.size <= 4000000){
          // validacion por tipo
          if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg' ){
            
             this.file = file;
   
          }else {
            iziToast.show({
               title:'ERROR:',
               titleColor:'red',
               class: 'text-danger',
               position:'topRight',
               message:'El formato del archivo debe ser una imagen'
           });
              $('#input-img').val('');
              this.file = null; 
          }
       
         }else {
         iziToast.show({
            title:'ERROR:',
            titleColor:'red',
            class: 'text-danger',
            position:'topRight',
            message:'La imagen es demasiado grande '
        }); 
           $('#input-img').val('');
           this.file = null; 
        }
 
      }else {
       iziToast.show({
         title:'ERROR:',
         titleColor:'red',
         class: 'text-danger',
         position:'topRight',
         message:'No se envio ninguna imagen'
     });
   }
       
     console.log(this.file); 
 
  }

    subir_imagen(){
       if(this.file != undefined && this.file != null){
           let data ={
            imagen: this.file, 
            _id :  uuidv4()
           }
            console.log(data); 
            this._productoService.agregar_imagen_galeria_admin(this.id, data,this.token).subscribe({ 
              next:(response)=>{
                 this.init_data();
                 $('#input-img').val('');  
                 this.file = null;          
                 }, 
               error:(error)=>{
                 console.log(error); 
               }
            });
            
       } else {
        iziToast.show({
          title:'ERROR:',
          titleColor:'red',
          class: 'text-danger',
          position:'topRight',
          message:'Debe seleccionar una imagen para subir'
      });
    }
    }

     eliminar(id:any, imagen: string){
      this.load_btn_eliminar = true;
      this._productoService.eliminar_imagen_galeria_admin(this.id,{_id: id, imagen: imagen} ,this.token).subscribe({
        next:(response)=>{
             iziToast.show({
             title:'SUCCESS:',
             titleColor:'#1DC74C',
             color:'#FFF',
             class: 'text-success',
             position:'topRight',
             message:'Se elimino correctamente la imagen'
   }); 
   
         $('#delete-'+id).modal('hide'); 
         $('.modal-backdrop').removeClass('show'); 
  
         this.init_data();
         this.load_btn_eliminar = false;
             }
      ,error:(error)=>{
         
         console.log(error);
         this.load_btn_eliminar = false;
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
