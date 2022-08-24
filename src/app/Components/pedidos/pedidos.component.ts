import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServcioService } from 'src/app/service/servcio.service';
import { DataService } from 'src/app/data.service'
import { ColumnMode } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  @ViewChild('dateColumn') dateColumn: TemplateRef<any>;
  loadingIndicator = true;
  reorderable = true;
  base64:any;
  ColumnMode = ColumnMode;
  closeResult: string;
  usuario: any;
  rowss: any;
  codigo: any;
  cantidad: any;
  constructor(private router:Router,private service:ServcioService, private data:DataService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usuario=JSON.parse(sessionStorage.getItem("Usuario"));
    this.service.getPedidos().toPromise().then(result=>{
      result.forEach(element => {
        try{
          element.tipoPago=JSON.parse(element.tipoPago)
          element.productos = JSON.parse(element.productos);
        }catch(e){

        }
      });
      this.rows=result;
      this.rowss=this.rows;
    })
  }
  rows = [];
  detalle(a){
    this.data.setData(a);
    this.router.navigate(['DetallePedidos']);
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  filter(a){
    console.log(a);
    this.rows=this.rowss.filter(res=>res.fecha.toLowerCase().includes(a.toLowerCase()));
  }
  diario(){
    let datos={fecha:new Date().toJSON().split("T")[0]};
    this.service.pedidos(datos).toPromise().then(res=>{
      console.log(res);
    }).catch(err=>{
      this.base64=btoa(err.error.text);
      var a = document.createElement("a"); //Create <a>
      
        a.href = "data:application/csv;base64," + this.base64; //Image Base64 Goes here
      a.download = "reporte.csv" //File name Here
      a.click(); //Downloaded file
    })
  }
  public objectKeys = Object.keys;
  fechas(){
    let datos={
      fecha1:this.codigo,
      fecha2:this.cantidad
    }
    this.service.pedidosfeha(datos).toPromise().then(res=>{
      console.log(res);
    }).catch(err=>{
      this.base64=btoa(err.error.text);
      var a = document.createElement("a"); //Create <a>
      
        a.href = "data:application/csv;base64," + this.base64; //Image Base64 Goes here
      a.download = "reporte.csv" //File name Here
      a.click(); //Downloaded file
    })
  }
}
