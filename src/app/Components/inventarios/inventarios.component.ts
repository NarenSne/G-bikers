import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ServcioService } from 'src/app/service/servcio.service';
import Swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent implements OnInit {
  info: any;
  dataImagen: any;
  cantidad="";
  codigo="";
  local="Local 1";
  imgSeleccionada: any;
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  columns = [{ name:'codigo',prop: 'Codigo' },{name:'Nombre',prop:'nombre'}, { name: 'Marca',prop: 'marca' }, { name: 'Descripcion', prop: 'descripcion' }, { name: 'Linea', prop: 'linea' }, { name: 'Imagen', prop: 'urlImg'  ,  sortable: false}, { name: 'Edit' ,  sortable: false}];
  productoss: any;
  constructor(public ngxSmartModalService: NgxSmartModalService,private router:Router,private service:ServcioService) { }
  productos:any=[]
  csesion(){
    Swal.fire({
      title: '¿Quieres cerrar sesión?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['Inicio'])
        sessionStorage.clear();
      } 
    })
  }

  ngOnInit(): void {
    this.service.getInventarios().toPromise().then(result=>{
      this.productos=JSON.parse(JSON.stringify(result))
      this.productoss=this.productos;
      this.productos=this.productoss.filter(res=>res.localU.toLowerCase().trim().includes(this.local.toLowerCase().trim()))
    })
  }
  inventario(){
    this.productos=this.productoss.filter(res=>res.localU===this.local)
  }
  pedidos(){
    this.router.navigate(['Pedidos']);
  }
  reportes(){
    this.router.navigate(['Reportes']);
  }
  reporte(){
    this.router.navigate(['Reporte']);
  }
  subir(a){
    for (var i = 0; i < a.target.files.length; i++) {
      /* -- obtener archivo --*/
      this.dataImagen = a.target.files[i];
    /* convertir img en bit y visualizar en la vista*/
      if ((this.dataImagen.name.split('.').pop() == "csv")) {
        const reader = new FileReader();
        // tslint:disable-next-line:no-shadowed-variable
        reader.onload = (event: any) => {
          const localUrl = event.target.result;
          this.imgSeleccionada = null;
          this.imgSeleccionada = localUrl;
            this.service.setInventarios({"local": this.local, "base64": this.imgSeleccionada.split(",")[1] }).toPromise().then(result => {
              this.service.getInventarios().toPromise().then(res=>{
                Swal.fire('Inventarios Subidos', '', 'success');
                $("#archivo").val("");
                this.productos=JSON.parse(JSON.stringify(res))
                this.local="Local 1"
                this.productoss=this.productos;
                this.productos=this.productoss.filter(res=>res.localU===this.local)
              })
            }).catch(ees=>{
              Swal.fire('Ha ocurrido un error', '', 'error')
            });;
        };
        reader.readAsDataURL(a.target.files[0]);
      }
      else {
        Swal.fire('Ha ocurrido un error', 'Recuerda que debe ser un archivo csv el cual tenga el codigo del producto y la cantidad', 'error')
      }
    }
  }
  filter(a){
    this.productos=this.productoss.filter(res=>res.localU.toLowerCase().trim().includes(this.local.toLowerCase().trim()) && res.nombre.toLowerCase().includes(a.toLowerCase()));
  }
  guardar(){
    this.service.setInventarios({"local": this.local, "base64": btoa(this.codigo+";"+this.cantidad)}).toPromise().then(result => {
      this.service.getInventarios().toPromise().then(res=>{
        Swal.fire('Inventarios Subidos', '', 'success');
        $("#archivo").val("");
        this.productos=JSON.parse(JSON.stringify(res))
      })
    }).catch(ees=>{
      Swal.fire('Ha ocurrido un error', '', 'error')
    });;    
  }
}
