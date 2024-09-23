import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast:any;
declare var jQuery:any ; 
declare var $: any ;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {
  
  public producto: any = {}; 
  public config : any = {} ;
  public imgSelect : any | ArrayBuffer = '';
  public btn_load = false;
  public load_data = true; 
  public token;
  public file: File | null;
  public url;
  public id:any; 
  public config_global: any ={}

  constructor(
        private _route: ActivatedRoute,
        private _productoService: ProductoService,
        private _router : Router,
        private _adminService: AdminService
  ){
    this.file = null; 
    this.config={
      height:500
    }
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;

    this._adminService.obtener_config_publico().subscribe({
      next:(response)=>{
                   this.config_global = response.data; 
                   }
     });

   }

   ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
         this.id = params['id'];
         this._productoService.obtener_producto_admin(this.id, this.token).subscribe({ 
         next:(response)=>{
            if(response.data == undefined){
                this.producto = undefined; 
                this.load_data= false;
           }else{
               this.producto = response.data;
               this.imgSelect = this.url+'obtener_portada/'+this.producto.portada;
                 this.load_data = false;
                // setTimeout(()=>{
               //},4000)
 
           }
         }, 
          error:(error)=>{
            console.log(error); 
          }
       });
     }
   )
   }

   actualizar(actualizarForm: NgForm){
      if(actualizarForm.valid){
       
        var  data:any = {}; 

         if(this.file != undefined || this.file != null) {
              data.portada = this.file; 
         }
         data.titulo = this.producto.titulo; 
         data.mapa = this.producto.mapa; 
         data.precio = this.producto.precio; 
         data.categoria = this.producto.categoria; 
         data.serv_domicilio = this.producto.serv_domicilio; 
         data.premium = this.producto.premium; 
         data.ciudad = this.producto.ciudad; 
         data.telefono = this.producto.telefono; 
         data.wpp = this.producto.wpp; 
         data.facebook = this.producto.facebook; 
         data.instagram = this.producto.instagram; 
         data.tiktok = this.producto.tiktok; 
         data.correo = this.producto.correo; 
         data.web = this.producto.web; 
         data.direccion_neg = this.producto.direccion_neg; 
         data.descripcion = this.producto.descripcion; 
         data.contenido = this.producto.contenido; 
         

        this.btn_load = true;
        this._productoService.actualizar_producto_admin(data, this.id, this.token).subscribe({ 
          next:(response)=>{
            iziToast.show({
              title:'SUCCESS:',
              titleColor:'#1DC74C',
              color:'#FFF',
              class: 'text-success',
              position:'topRight',
              message:' El profesional se actualizo correctamente '
              });
              this.btn_load = false;
              this._router.navigate(['/panel/productos']);    
          }, 
           error:(error)=>{
            this.btn_load = false;
             console.log(error); 
           }
        });



      }else{
          iziToast.show({
          title:'ERROR:',
          titleColor:'red',
          class: 'text-danger',
          position:'topRight',
          message:'los datos del formulario no son validos'
          });
          this.btn_load = false; 
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
     
   console.log(this.file); 

}

}
