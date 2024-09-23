import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor, NgForm } from '@angular/forms';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { AdminService } from 'src/app/services/admin.service';
import { v4 as uuidv4 } from 'uuid';

declare var iziToast:any; 
declare var jQuery:any ; 
declare var $: any ;


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit{

  public token; 
  public config: any = {}; 
  public imgSelect : any | ArrayBuffer = '';
  public imgForService : any | ArrayBuffer = '';
  public titulo_ser: any =''; 
  public cat_servicio: any = ''; 
  public file: File | null;
  public file_ser: File | null;
  public url;

  constructor(
     private _adminService: AdminService
  ){
    this.url = GLOBAL.url; 
    this.file = null; 
    this.file_ser =null; 
    this.token= localStorage.getItem('token'); 
     this.init_data(); 
  }

   ngOnInit(): void {
     
   }

   init_data(){
    this._adminService.obtener_config_admin(this.token).subscribe({
      next:(response)=>{
        
       this.config = response.data; 
       this.imgSelect = this.url+'obtener_logo/'+this.config.logo;
       console.log(response);

        }
    ,error:(error)=>{
        console.log(error);
    } 
    });
   }

   agregar_ser(){
      if(this.titulo_ser && this.file_ser != undefined && this.file_ser != null && this.cat_servicio){
      let data = {
        titulo: this.titulo_ser,
        categoria: this.cat_servicio,
        _id:  uuidv4()
      }

           this._adminService.agregar_servicio("654e6824e6880da59ee4beff",this.file_ser,data,this.token).subscribe({ 
            next:(response)=>{
              this.init_data(); 
              this.file_ser=null;
              this.titulo_ser=''; 
              this.cat_servicio=''; 
              window.location.reload();
               }, 
             error:(error)=>{
               console.log(error); 
             }
          });
          

      }else{
          iziToast.show({
          title:'ERROR:',
          titleColor:'red',
          class: 'text-danger',
          position:'topRight',
          message:'debe ingresar un titulo, icono y categoria para el registro del servicio '
      });
      }
   }

   actualizar(configForm:NgForm){
    if(configForm.valid){
   
       let data = {
         titulo: configForm.value.titulo,
         serie: configForm.value.serie,
         correlativo: configForm.value.correlativo,
         servicios: this.config.servicios,
         logo: this.file
       }

       console.log(data); 

       this._adminService.actualizar_config_admin("654e6824e6880da59ee4beff",data ,this.token).subscribe({
        next:(response)=>{
          iziToast.show({
            title:'SUCCESS:',
            titleColor:'#1DC74C',
           color:'#FFF',
           class: 'text-success',
           position:'topRight',
           message:'Se Actualizaron correctamente las configuraciones' });     
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
        message:'Complete correctamente el formulario'
    });
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
           
           $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
           $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload'); 

           reader.readAsDataURL(file); 
           $('#input-logo').text(file.name)
           this.file = file;
 
        }else {
          iziToast.show({
             title:'ERROR:',
             titleColor:'red',
             class: 'text-danger',
             position:'topRight',
             message:'El formato del archivo debe ser una imagen'
         });
         $('#input-logo').text('Seleccionar imagen');
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
        $('#input-logo').text('Seleccionar imagen');
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

fileChangedEvent(event:any):void{
  var file_ser; 
  if(event.target.files && event.target.files[0]){
     file_ser = <File>event.target.files[0]; 
     

     if(file_ser.size <= 4000000){
      // validacion por tipo
      if(file_ser.type == 'image/png' || file_ser.type == 'image/webp' || file_ser.type == 'image/png' || file_ser.type == 'image/jpg' || file_ser.type == 'image/gif' || file_ser.type == 'image/jpeg' || file_ser.type =='image/svg' ){
         const reader = new FileReader(); 
         reader.onload = e=> this.imgForService = reader.result; 
         
         $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
         $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload'); 

         reader.readAsDataURL(file_ser); 
         $('#input-portada-label').text(file_ser.name)
         this.file_ser = file_ser;

      }else {
        iziToast.show({
           title:'ERROR:',
           titleColor:'red',
           class: 'text-danger',
           position:'topRight',
           message:'El formato del archivo debe ser una imagen'
       });
       $('#input-portada-label').text('Seleccionar imagen');
       this.imgForService ='assets/img/01.jpg';
       this.file_ser = null; 
      }
   
     }else {
     iziToast.show({
        title:'ERROR:',
        titleColor:'red',
        class: 'text-danger',
        position:'topRight',
        message:'La imagen es demasiado grande '
    });
      $('#input-portada-label').text('Seleccionar imagen');
      this.imgForService='assets/img/01.jpg';
      this.file_ser = null; 
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
   
 console.log(this.file_ser); 

}

ngDoCheck():void{
  $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">");
  
}

eliminar_servicio(id:any, titulo:any, icono:string, categoria:any ){
  
   this._adminService.eliminar_servicio({_id: id, titulo:titulo,  icono: icono, categoria:categoria} , this.token).subscribe({
    next:(response)=>{
       iziToast.show({
       title:'SUCCESS:',
       titleColor:'#1DC74C',
       color:'#FFF',
       class: 'text-success',
       position:'topRight',
       message:'Se elimino correctamnete el servicio' });   
       window.location.reload();  
      }
  ,error:(error)=>{
      console.log(error);
  } 
  });
}

}
