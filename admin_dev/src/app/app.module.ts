import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'; 
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxTinymceModule } from 'ngx-tinymce';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClientesComponent } from './components/clientes/index-clientes/index-clientes.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { IndexProductosComponent } from './components/productos/index-productos/index-productos.component';
import { UpdateProductoComponent } from './components/productos/update-producto/update-producto.component';
import { ConfigComponent } from './components/config/config.component';
import { GaleriaProductoComponent } from './components/productos/galeria-producto/galeria-producto.component';
import { IndexContactoComponent } from './components/contacto/index-contacto/index-contacto.component';
import { ReviewsProductoComponent } from './components/productos/reviews-producto/reviews-producto.component';
import { IndexVentasComponent } from './components/ventas/index-ventas/index-ventas.component';
import { DetalleVentasComponent } from './components/ventas/detalle-ventas/detalle-ventas.component';
import { IndexAdministradorComponent } from './components/administradores/index-administrador/index-administrador.component';
import { EditAdminComponent } from './components/administradores/edit-admin/edit-admin.component';
import { CreateAdminComponent } from './components/administradores/create-admin/create-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexClientesComponent,
    CreateClienteComponent,
    EditClienteComponent,
    CreateProductoComponent,
    IndexProductosComponent,
    UpdateProductoComponent,
    ConfigComponent,
    GaleriaProductoComponent,
    IndexContactoComponent,
    ReviewsProductoComponent,
    IndexVentasComponent,
    DetalleVentasComponent,
    IndexAdministradorComponent,
    EditAdminComponent,
    CreateAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    routing,
    NgbPaginationModule,
    NgxTinymceModule.forRoot({
      baseURL:'../../../assets/tinymce/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
