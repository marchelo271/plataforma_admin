import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

declare var iziToast: any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit,OnDestroy {

  public cliente: any = {}; 
  public id : any; 
  public token; 
  private subscription: Subscription | null = null;
  public btn_load = false;
  public load_data = true; 

  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router
  ){
     this.token = this._adminService.getToken(); 
  }

ngOnInit(): void {
    this._route.params.subscribe(
     params=>{
        this.id = params['id'];
       this.subscription= this._clienteService.obtener_cliente_admin(this.id, this.token).subscribe({ 
        next:(response)=>{
          console.log(response); 
          if(response.data == undefined){
               this.cliente = undefined; 
               this.load_data= false;
          }else{
              this.cliente = response.data;
              
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

ngOnDestroy(): void {
  if (this.subscription) {
   this.subscription.unsubscribe();
}
}



  actualizar(updateForm:NgForm){
     if(updateForm.valid){
        this.btn_load = true;
        this.subscription= this._clienteService.actualizar_cliente_admin(this.id, this.cliente, this.token).subscribe({ 
          next:(response)=>{
            iziToast.show({
              title:'SUCCESS:',
              titleColor:'#1DC74C',
             color:'#FFF',
             class: 'text-success',
             position:'topRight',
             message:'Se Actualizó correctamente el nuevo cliente' });

             this.btn_load = false; 
             this._router.navigate(['/panel/clientes']);

          }, 
           error:(error)=>{
               console.log(error)
           }
        });
     }else {
      iziToast.show({
        title:'ERROR:',
        titleColor:'red',
        class: 'text-danger',
        position:'topRight',
        message:'los datos del formulario no son validos'
    });
     }
  }
}
