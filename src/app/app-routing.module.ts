import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './Components/inicio/inicio.component';
import { ContactoComponent } from './Components/contacto/contacto.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { MiListaComponent } from './Components/mi-lista/mi-lista.component';
import { PedidosComponent } from './Components/pedidos/pedidos.component';
import { ProductoComponent } from './Components/producto/producto.component';
import { ReportesComponent } from './Components/reportes/reportes.component';
import { DetalleComponent } from './Components/pedidos/detalle/detalle.component';
import { InventariosComponent } from './Components/inventarios/inventarios.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { CajaComponent } from './Components/caja/caja.component';

const routes: Routes = [
  { path: 'Inicio', component: InicioComponent },
  { path: 'Contacto', component: ContactoComponent },
  { path: 'Productos', component: ProductosComponent },
  { path: 'MiLista', component: MiListaComponent },
  { path: 'Pedidos', component: PedidosComponent },
  { path: 'DetallePedidos', component: DetalleComponent },
  { path: 'Reportes', component: ProductoComponent },
  { path: 'Inventario', component: InventariosComponent },
  { path: 'Reporte', component: ReportesComponent },
  { path: 'Usuarios', component: UsuariosComponent },
  { path: 'Caja', component: CajaComponent },
  { path: '**', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
