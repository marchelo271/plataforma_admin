import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders, createComponent } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { adminGuard } from "./guards/admin.guard";
import { IndexClientesComponent } from "./components/clientes/index-clientes/index-clientes.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
import { EditClienteComponent } from "./components/clientes/edit-cliente/edit-cliente.component";
import { CreateProductoComponent } from "./components/productos/create-producto/create-producto.component";
import { IndexProductosComponent } from "./components/productos/index-productos/index-productos.component";
import { UpdateProductoComponent } from "./components/productos/update-producto/update-producto.component";
import { ConfigComponent } from "./components/config/config.component";
import { GaleriaProductoComponent } from "./components/productos/galeria-producto/galeria-producto.component";
import { IndexContactoComponent } from "./components/contacto/index-contacto/index-contacto.component";
import { ReviewsProductoComponent } from "./components/productos/reviews-producto/reviews-producto.component";
import { IndexVentasComponent } from "./components/ventas/index-ventas/index-ventas.component";
import { DetalleVentasComponent } from "./components/ventas/detalle-ventas/detalle-ventas.component";
import { IndexAdministradorComponent } from "./components/administradores/index-administrador/index-administrador.component";
import { CreateAdminComponent } from "./components/administradores/create-admin/create-admin.component";
import { EditAdminComponent } from "./components/administradores/edit-admin/edit-admin.component";

const appRoute : Routes = [
  {path:'', redirectTo:'inicio', pathMatch:'full'}, 
  {path:'inicio', component:InicioComponent, canActivate:[adminGuard]},
  {path:'panel',children:[

    {path:'administradores', component: IndexAdministradorComponent, canActivate:[adminGuard]},
    {path:'administradores/registro', component: CreateAdminComponent, canActivate:[adminGuard]},
    {path:'administradores/:id', component: EditAdminComponent, canActivate:[adminGuard]}, 

     {path:'clientes', component: IndexClientesComponent, canActivate:[adminGuard]},
     {path:'clientes/registro', component:CreateClienteComponent, canActivate:[adminGuard]},
     {path:'clientes/:id', component:EditClienteComponent, canActivate:[adminGuard]},

     {path:'productos', component:IndexProductosComponent, canActivate:[adminGuard]},
     {path:'productos/registro', component:CreateProductoComponent, canActivate:[adminGuard]},
     {path:'productos/:id', component:UpdateProductoComponent, canActivate:[adminGuard]},
     {path:'productos/galeria/:id', component:GaleriaProductoComponent, canActivate:[adminGuard]},
     {path:'productos/reviews/:id', component:ReviewsProductoComponent, canActivate:[adminGuard]},
  
     {path:'configuraciones', component: ConfigComponent, canActivate:[adminGuard]}, 

     {path:'ventas', component: IndexVentasComponent, canActivate:[adminGuard]}, 
     {path:'ventas/:id', component: DetalleVentasComponent, canActivate:[adminGuard]},

     {path:'contactos', component: IndexContactoComponent, canActivate:[adminGuard]},
  ]},
  {path:'login', component:LoginComponent}

]

export const appRoutingProviders: any[]=[]; 
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute); 
