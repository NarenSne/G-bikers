import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServcioService } from 'src/app/service/servcio.service';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  @ViewChild("myModal2",{static:true}) modal:NgbActiveModal;
  productos: any;
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  productoss: any;
  anadir:any=[];
  anadirs: any=[];
  info: any;
  total:number=0;
  efectivos:number=0;
  enNequi:number=0;
  enDaviplata:number=0;
  enTajera:number=0;
  isEfectivo: boolean;
  datass=null;
  valedado:any;
  valorvale:any;
  constructor(public ngxSmartModalService: NgxSmartModalService,private sharedService:SharedService,private service:ServcioService, private spinner:NgxSpinnerService,private routera:ActivatedRoute) { }
  form: FormGroup;
  ngOnInit(): void {
    this.service.getProducts().subscribe(result=> {
      this.productos=result;this.productoss=this.productos;
    })
    this.form = new FormGroup({
      efectivos:new FormControl('',[Validators.required,Validators.min(0)]),
      enNequi:new FormControl('',[Validators.required,Validators.min(0)]),
      enDaviplata:new FormControl('',[Validators.required,Validators.min(0)]),
      enTajera:new FormControl('',[Validators.required,Validators.min(0)]),
      banco:new FormControl('',[Validators.required,Validators.min(0)])
    })  
  }
  filter(a){
    if(a.keyCode==13){
      this.service.getProducts().subscribe(result=> {
        this.productos=result;this.productoss=this.productos;
      })
      var ll=this.productos.filter(res=>res.codigo.toLowerCase()==(a.target.value.toLowerCase()));
      if(this.anadirs.some(item=> item.codigo===a.target.value)){
        let datoss=this.anadirs.filter(item=> item.codigo===a.target.value);
        datoss[0].cantidad=datoss[0].cantidad+1;
        this.total=this.total+parseInt(datoss[0].precio);
        let index=this.anadirs.findIndex(item=> item.codigo===a.target.value);
        this.anadirs[index]=datoss[0];
      }else{
        ll[0].cantidad=1;
        this.total=this.total+parseInt(ll[0].precio);
        this.anadirs.push(ll[0])
      }
      console.log(this.anadirs)
      this.anadir=[...this.anadirs];
      a.target.value="";
    }
  }
  eliminar(a){
    let datos=(this.anadirs.filter(res=>res.codigo==a));
    this.total=this.total-(parseInt(datos[0].precio)*datos[0].cantidad);
    this.anadirs=this.anadirs.filter(res=>res.codigo!=a);
    this.anadir=[...this.anadirs]
  }
  temp:number;
  edit(row){
    this.info=row;
    this.temp=row.precio*row.cantidad;
    setTimeout(a=>{
      this.ngxSmartModalService.getModal('myModal').open()
      this.ngxSmartModalService.setModalData(row,'myModal');
      console.log(this.ngxSmartModalService.getModalData('myModal'))
    },100)
  }

  editar(){
    let datos=this.ngxSmartModalService.getModalData("myModal");
    this.info=null;
    this.ngxSmartModalService.resetModalData('myModal');
    let id=this.anadirs.findIndex(element => element.codigo == datos.codigo);
    this.anadirs[id].precio=datos.precio;
    this.anadir=[...this.anadirs];
    this.total=this.total-this.temp;
    this.total=this.total+(datos.precio*datos.cantidad);
    console.log(this.productos)
  }
  salir(){
    this.ngxSmartModalService.resetModalData('myModal');
  }
  salida(){
    let datos=this.ngxSmartModalService.getModalData("myModal3");
    console.log(datos);
    this.service.registraSalida(datos).subscribe(res=>{
      this.ngxSmartModalService.close('myModal3');
      this.datass=null;
      this.ngxSmartModalService.resetModalData('myModal3');
    })
  }
  minus(){
    this.datass={
      nombre:"",
      descripcion:"",
      precio:0,
      caja:JSON.parse(sessionStorage.getItem("Usuario"))[0].localU
    }
    this.ngxSmartModalService.setModalData(this.datass,"myModal3")
  }
  admin(){
    this.datass={
      nombre:"",
      descripcion:"",
      precio:0,
      caja:null
    }
    this.ngxSmartModalService.setModalData(this.datass,"myModal3")
  }
  integrar(){
    this.service.integrar().subscribe(res=>{
      Swal.fire('Se ha integrado los pedidos en local con el servidor','','success');
    })
  }
  nequi(){
    Swal.fire({
      title: '¿Quiere pagar con Nequi?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        let datos={
          nombreCaja:JSON.parse(sessionStorage.getItem("Usuario"))[0].nombre,
          localu:JSON.parse(sessionStorage.getItem("Usuario"))[0].localU,
          fecha:new Date().toLocaleString("es").replace(/\//g,"-"),
          total:this.total,
          productos:JSON.stringify(this.anadir),
          tipoPago:"Nequi"
        }
		    this.service.newPedido(datos).subscribe(res=>{
          this.ngxSmartModalService.closeAll();
          this.modal.close();
          this.total=0;
          this.anadir=[];
          this.anadirs=[];
        }) 
      } 
    });
  }
  davi(){
    Swal.fire({
      title: '¿Quiere pagar con Daviplata?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        let datos={
          nombreCaja:JSON.parse(sessionStorage.getItem("Usuario"))[0].nombre,
          localu:JSON.parse(sessionStorage.getItem("Usuario"))[0].localU,
          fecha:new Date().toLocaleString("es").replace(/\//g,"-"),
          total:this.total,
          productos:JSON.stringify(this.anadir),
          tipoPago:"Daviplata"
        }
		    this.service.newPedido(datos).subscribe(res=>{
          this.ngxSmartModalService.closeAll();
          this.modal.close()
          this.anadir=[];
          this.anadirs=[];
          this.total=0;
        })
      } 
    });
  }
  tarjeta(){
    Swal.fire({
      title: '¿Quiere pagar con Tarjeta?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        let datos={
          nombreCaja:JSON.parse(sessionStorage.getItem("Usuario"))[0].nombre,
          localu:JSON.parse(sessionStorage.getItem("Usuario"))[0].localU,
          fecha:new Date().toLocaleString("es").replace(/\//g,"-"),
          total:this.total,
          productos:JSON.stringify(this.anadir),
          tipoPago:"Tarjeta"
        }
		    this.service.newPedido(datos).subscribe(res=>{
          this.ngxSmartModalService.closeAll();
          this.modal.close();
          this.anadir=[];
          this.anadirs=[];
          this.total=0;
        })
      } 
    });
  }
  efectivo(){
    this.isEfectivo=true;
  }
  count(obj) {
    var count=0;
    for(var prop in obj) {
       if (obj.hasOwnProperty(prop)) {
          ++count;
       }
    }
    return count;
 }
 banco=0;
  cancelar(){
        let pagos = {
          nequi:this.enNequi,
          daviplata:this.enDaviplata,
          tarjeta:this.enTajera,
          efectivo:this.efectivos,
          banco:this.banco
        }
        let total = (this.banco+this.efectivos+this.enNequi+this.enDaviplata+this.enTajera)-this.total;
        if(total>0){
          var maxProp = null
          var maxValue = -1
          for (var prop in pagos) {
            if (pagos.hasOwnProperty(prop)) {
              var value = pagos[prop]
              if (value > maxValue) {
                maxProp = prop
                maxValue = value
              }
            }
          }
          switch (maxProp) {
              case "nequi":
                pagos.nequi=pagos.nequi-total;
              break;
              case "daviplata":
                pagos.daviplata=pagos.daviplata-total;
              break;
              case "tarjeta":
                pagos.tarjeta=pagos.tarjeta-total;
              break;
              case "efectivo":
                pagos.efectivo=pagos.efectivo-total;
              break;
              case "banco":
                pagos.banco=pagos.banco-total;
              break;
          
            default:
              break;
          }
        }
        let datos={
          nombreCaja:JSON.parse(sessionStorage.getItem("Usuario"))[0].nombre,
          localu:JSON.parse(sessionStorage.getItem("Usuario"))[0].localU,
          fecha:new Date().toLocaleString("es").replace(/\//g,"-"),
          total:this.total,
          productos:JSON.stringify(this.anadir),
          tipoPago:JSON.stringify(pagos)
        }
		    this.service.newPedido(datos).subscribe(res=>{
          this.ngxSmartModalService.closeAll();
          this.modal.close()
          this.anadir=[];
          this.anadirs=[];
          this.total=0;
          this.enNequi=0;
          this.enDaviplata=0;
          this.enTajera=0;
          this.efectivos=0;
        }) 
      } 
  nuevovale(){
    let datos={
      dadoa:this.valedado,
      valor:this.valorvale,
      caja:JSON.parse(sessionStorage.getItem("Usuario"))[0].localU
    };
    this.service.nuevovale(datos).subscribe(res=>{
      this.ngxSmartModalService.close('myModal4');
      this.datass=null;
      this.ngxSmartModalService.resetModalData('myModal4');
    })
  }
}
