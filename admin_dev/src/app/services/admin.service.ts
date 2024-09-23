import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url;
  constructor(
    private _http: HttpClient 
  ) {
      this.url= GLOBAL.url;
   }
   login_admin(data:any):Observable<any>{
       let headers = new HttpHeaders().set('Content-Type','application/json'); 
       return this._http.post(this.url+'login_admin', data, {headers:headers});
   }

   getToken(){
      return localStorage.getItem('token'); 
   }

   public isAuthenticated(allowedRoles: string[]):boolean{
     const token= localStorage.getItem('token') ; 
     
     if(!token){
      return false; 
     }  
     try{
      const helper = new JwtHelperService(); 
      var decodeToken = helper.decodeToken(token);

      if(helper.isTokenExpired(token)){
        localStorage.clear();
        return false
      } 

      if(!decodeToken){
        console.log('Token invalido');         
        localStorage.removeItem('token'); 
        return false;
       }

     } catch(error) {
       localStorage.removeItem('token'); 
       return false; 
     }
    
      return allowedRoles.includes(decodeToken['role']) 
   } 
   
   obtener_config_admin(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token}); 
    return this._http.get(this.url+'obtener_config_admin',{headers:headers});
  }

  actualizar_config_admin(id:any ,data:any ,token:any ):Observable<any>{
    if(data.logo){
      let headers = new HttpHeaders({'Authorization':token}); 
      const fd = new FormData(); 
       fd.append('titulo', data.titulo);
       fd.append('serie', data.serie);
       fd.append('correlativo', data.correlativo);
       fd.append('servicios',JSON.stringify(data.servicios));
       fd.append('logo',data.logo);
       
     return this._http.put(this.url+'actualizar_config_admin/'+id,fd,{headers:headers});
    }else {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token}); 
    return this._http.put(this.url+'actualizar_config_admin/'+id, data , {headers:headers});
    }
  }

  agregar_servicio(id:any,file:any, data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Authorization':token}); 
     const fd = new FormData(); 
      fd.append('titulo', data.titulo);
      fd.append('categoria', data.categoria);
      fd.append('_id', data._id);
      fd.append('icono',file);
      
    return this._http.put(this.url+'agregar_servicio/'+id,fd,{headers:headers});
}

eliminar_servicio( data:{ _id: any,titulo:any , icono: string, categoria:any, }, token: any): Observable<any> {
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': token
  }); 
  return this._http.put(this.url + 'eliminar_servicio' , data, { headers: headers });
}
  

  obtener_config_publico():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json'); 
    return this._http.get(this.url+'obtener_config_publico',{headers:headers});
  }

  registro_admin(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json'); 
    return this._http.post(this.url+'registro_admin', data,{headers:headers});
  }

  listar_todos_admin_filtro(tipo:any, filtro:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token}); 
    return this._http.get(this.url+'listar_todos_admin_filtro/'+tipo+'/'+filtro,{headers:headers});
  } 

  eliminar_administrador(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token}); 
    return this._http.delete(this.url+'eliminar_administrador/'+id,{headers:headers});
  }
  
  obtener_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token}); 
    return this._http.get(this.url+'obtener_admin/'+id,{headers:headers});
  }

  actualizar_admin(id:any,data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token}); 
    return this._http.put(this.url+'actualizar_admin/'+id, data, {headers:headers});
  }
   
  // Solicitudes
  obtener_mensajes_admin(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token}); 
    return this._http.get(this.url+'obtener_mensajes_admin',{headers:headers});
  } 

  cerrar_mensaje_admin(id:any ,data:any, token:any ):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token}); 
    return this._http.put(this.url+'cerrar_mensaje_admin/'+id,data,{headers:headers});
  }

  eliminar_mensaje_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token}); 
    return this._http.delete(this.url+'eliminar_mensaje_admin/'+id,{headers:headers});
  }

  // Solicitudes
  obtener_solicitudes_admin(desde:any ,hasta:any, token:any ):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token}); 
    return this._http.get(this.url+'obtener_solicitudes_admin/'+desde+'/'+hasta,{headers:headers});
  }
  
  obtener_detalles_solicitudes_cliente (id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token}); 
    return this._http.get(this.url+'obtener_detalles_solicitudes_cliente/'+id ,{headers:headers});
  }

  eliminar_solicitud_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token}); 
    return this._http.delete(this.url+'eliminar_solicitud_admin/'+id,{headers:headers});
  }

  // Reseñas 

  eliminar_review(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token}); 
    return this._http.delete(this.url+'eliminar_review/'+id,{headers:headers});
  }

}

