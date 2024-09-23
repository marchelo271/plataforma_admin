import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';


declare var iziToast: any;
declare var jQuery:any ; 
declare var $: any ; 
@Component({
  selector: 'app-reviews-producto',
  templateUrl: './reviews-producto.component.html',
  styleUrls: ['./reviews-producto.component.css']
})
export class ReviewsProductoComponent implements OnInit {
  public producto:any = {}; 
  public load_data = true; 
  public id: any;   
  public token;
  public iduser;
  public url;
  public load_btn= false;
  public reviews:Array<any>=[];  
  public page= 1; 
  public pageSize = 20; 

  
  constructor(
    private _router: Router,
    private _adminService: AdminService,
    private _productoService: ProductoService,
    private _route: ActivatedRoute
 ){
   this.token = localStorage.getItem('token');
   this.iduser = localStorage.getItem('_id');
   this.url = GLOBAL.url; 
  }

    ngOnInit(): void {
      this._route.params.subscribe(
        params=>{
           this.id = params['id'];
           this._productoService.obtener_producto_admin(this.id, this.token).subscribe({ 
           next:(response)=>{
             console.log(response); 
             if(response.data == undefined){
                  this.producto = undefined; 
                  this.load_data= false;
             }else{
                 this.producto = response.data;
                 this._productoService.obtener_reviews_producto_publico(this.producto._id).subscribe({
                   next:(response)=>{
                     this.reviews = response.data; 
                   }
                 });
                 this.load_data = false;
               
             }
           }, 
            error:(error)=>{
            console.log(error); 
            }
         });
       }
     );
    }

    eliminar(id:any){
      this._adminService.eliminar_review(id, this.token).subscribe({
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
   
           
             }
      ,error:(error)=>{
         console.log(error);
      } 
      });
   }  

}
