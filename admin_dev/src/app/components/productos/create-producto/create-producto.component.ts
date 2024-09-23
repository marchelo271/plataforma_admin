import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

declare var iziToast: any;
declare var jQuery:any ; 
declare var $: any ;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit, OnDestroy{
  
  public profesional:any={
    categoria:'',
    ciudad:'',
    serv_domicilio: false ,
    premium: false 
  };
  public file: File | null;
  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  public config:any = {};
  public token;
  private subscription: Subscription | null = null;
  public btn_load = false;
  public config_global: any = {}; 

  constructor(
     private _productoService: ProductoService,
     private _adminService: AdminService,
     private _router : Router
  ){
     this.file= null; 
     this.config={
       height:500
     }

     this.token = this._adminService.getToken(); 
     
     this._adminService.obtener_config_publico().subscribe({
      next:(response)=>{
                   this.config_global = response.data; 
                   }
     });
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
        
       if(this.file == null || this.file == undefined){
          iziToast.show({
          title:'ERROR:',
          titleColor:'red',
          class: 'text-danger',
          position:'topRight',
          message:'Debe subir una imagen de portada para registrar el producto '
      }); 
       } else {
       
        this.btn_load = true;
        this.subscription= this._productoService.registro_producto_admin(this.profesional, this.file, this.token).subscribe({
          next:(response)=>{
              iziToast.show({
              title:'SUCCESS:',
              titleColor:'#1DC74C',
              color:'#FFF',
              class: 'text-success',
              position:'topRight',
              message:'Se creo correctamente el nuevo producto'
   });
              this.btn_load = false;
              this._router.navigate(['/panel/productos']);    
               }
        ,error:(error)=>{
          this.btn_load = false;
           console.log(error);
        } 
      });
       }

     }else {
        iziToast.show({
        title:'ERROR:',
        titleColor:'red',
        class: 'text-danger',
        position:'topRight',
        message:'los datos del formulario no son validos'
    }); 
    this.btn_load = false;
    $('#input-portada').text('Seleccionar imagen');
    this.imgSelect ='assets/img/01.jpg';
    this.file = null; 
     }
  }

  fileChangeEvent(event:any):void{
     var file; 
     if(event.target.files && event.target.files[0]){
        file = <File>event.target.files[0]; 
        

        if(file.size <= 4000000){
         // validacion por tipo
         if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg' ){
            const reader = new FileReader(); 
            reader.onload = e=> this.imgSelect = reader.result; 
            console.log(this.imgSelect); 
            reader.readAsDataURL(file); 
            $('#input-portada').text(file.name)
            this.file = file;
  
         }else {
           iziToast.show({
              title:'ERROR:',
              titleColor:'red',
              class: 'text-danger',
              position:'topRight',
              message:'El formato del archivo debe ser una imagen'
          });
          $('#input-portada').text('Seleccionar imagen');
          this.imgSelect ='assets/img/01.jpg';
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
         $('#input-portada').text('Seleccionar imagen');
         this.imgSelect ='assets/img/01.jpg';
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


 }


}
