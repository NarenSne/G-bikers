import { CurrencyPipe, formatCurrency, NgLocaleLocalization, NgLocalization } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as HighCharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import { NgxSpinnerService } from 'ngx-spinner';
import { pipe } from 'rxjs';
import { ServcioService } from 'src/app/service/servcio.service';
import Swal from 'sweetalert2';
exporting(HighCharts);
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  ano:string=new Date().toLocaleDateString("es").replace(/\//g,"-");
  linea:string;
  local:string="";
  rows: any;
  efectivo: any=0;
  nequi: any=0;
  daviplata: any=0;
  tarjeta: any=0;
  salida: number=0;
  banco: number=0;
  codigo: any;
  salidaadic: number=0;
  constructor(private router:Router,private service:ServcioService,private spinner:NgxSpinnerService) { }
  grafica:any=0;
  total:number=0;
  vales:number=0;
  rol=JSON.parse(sessionStorage.getItem("Usuario"))[0].Tipo;
  ngOnInit(): void {
    if(this.rol!="Admin"){
      this.local=JSON.parse(sessionStorage.getItem("Usuario"))[0].localU
    }
  }
  inventario(){
    this.router.navigate(['Inventario']);
  }
  pedidos(){
    this.router.navigate(['Pedidos']);
  }
  reportes(){
    this.router.navigate(['Reportes']);
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
  anos(a){
    this.total=0;
    this.efectivo=0;
    this.tarjeta=0;
    this.nequi=0;
    this.daviplata=0;
    this.salida=0;
    this.vales=0;
    this.banco=0
    this.spinner.show();
    this.service.getPedidosDia(a,this.local).toPromise().then(result=>{
      let data=result;
      data.forEach(element => {
        this.total=this.total+parseInt(element.total);
        let tipoPa = JSON.parse(element.tipoPago);
        this.efectivo=this.efectivo+parseInt(tipoPa.efectivo);
        this.nequi=this.nequi+parseInt(tipoPa.nequi);
        this.daviplata=this.daviplata+parseInt(tipoPa.daviplata);
        this.tarjeta=this.tarjeta+parseInt(tipoPa.tarjeta);
        this.banco=this.banco+parseInt(tipoPa.banco);
      });
    })
    this.service.getSalidasDia(a,this.local).toPromise().then(result=>{
      this.rows=result;
      this.rows.forEach(element => {
        this.salida=this.salida+parseInt(element.valor);
      });
    })
    this.service.vales(a,this.local).toPromise().then(result=>{
      let data=result;
      data.forEach(element => {
        this.vales=this.vales+parseInt(element.valor);
      });
    })
      this.spinner.hide();
  }
  mensual(){
    this.total=0;
    this.efectivo=0;
    this.tarjeta=0;
    this.nequi=0;
    this.daviplata=0;
    this.salida=0;
    this.salidaadic=0;
    this.vales=0;
    this.banco=0;
    this.spinner.show();
    let mes=new Date().toJSON().substr(0,7);
    this.ano=new Date().toJSON().substr(0,7);
    this.service.getPedidosDia(mes,this.local).toPromise().then(result=>{
      let data=result;
      data.forEach(element => {
        this.total=this.total+parseInt(element.total);
        let tipoPa = JSON.parse(element.tipoPago);
            this.efectivo=this.efectivo+parseInt(tipoPa.efectivo);
            this.nequi=this.nequi+parseInt(tipoPa.nequi);
            this.daviplata=this.daviplata+parseInt(tipoPa.daviplata);
            this.tarjeta=this.tarjeta+parseInt(tipoPa.tarjeta);
            this.banco=this.banco+parseInt(tipoPa.banco);
      });
    })
    this.service.getSalidasDia(mes,this.local).toPromise().then(result=>{
      this.rows=result;
      this.rows.forEach(element => {
        if(element.localU!=""){
        this.salida=this.salida+parseInt(element.valor);
        }else{
          this.salidaadic=this.salidaadic+parseInt(element.valor);
        }
      });
    })
    this.service.vales(mes,this.local).toPromise().then(result=>{
      let data=result;
      data.forEach(element => {
          this.vales=this.vales+parseInt(element.valor);
      });
    })
      this.spinner.hide();
  }
  Imprimir(){
    let datos={
      total:formatCurrency(this.total,"en-US","$"),
      efectivo:formatCurrency(this.efectivo,"en-US","$"),
      tarjeta:formatCurrency(this.tarjeta,"en-US","$"),
      nequi:formatCurrency(this.nequi,"en-US","$"),
      daviplata:formatCurrency(this.daviplata,"en-US","$"),
      banco:formatCurrency(this.banco,"en-US","$"),
      salida:formatCurrency(this.salida,"en-US","$"),
      salidaadic:formatCurrency(this.salidaadic,"en-US","$"),
      vales:formatCurrency(this.vales,"en-US","$"),
      fecha:this.ano
    };
    this.service.print(datos).subscribe(ss=>{
      
    })
  }
  salidas(){
    let datos={
      fecha:this.ano,
      caja:this.local
    };
    this.service.salidas(datos).subscribe(ss=>{
      
    })
  }
  eliminar(datos){
    this.service.eliminarSalidas(datos).subscribe(ss=>{
      this.salida=0
      this.service.getSalidasDia(this.ano,this.local).toPromise().then(result=>{
        this.rows=result;
        this.rows.forEach(element => {
          this.salida=this.salida+parseInt(element.valor);
        });
      })
    })
  }
  public objectKeys = Object.keys;
  fechas(){
    this.total=0;
    this.efectivo=0;
    this.tarjeta=0;
    this.nequi=0;
    this.daviplata=0;
    this.salida=0;
    this.salidaadic=0;
    this.vales=0;
    this.banco=0;
    this.spinner.show();
    let mes=new Date(this.codigo).toJSON().substr(0,7);
    this.ano=new Date(this.codigo).toJSON().substr(0,7);
    this.service.getPedidosDia(mes,this.local).toPromise().then(result=>{
      let data=result;
      data.forEach(element => {
        this.total=this.total+parseInt(element.total);
        let tipoPa = JSON.parse(element.tipoPago);
            this.efectivo=this.efectivo+parseInt(tipoPa.efectivo);
            this.nequi=this.nequi+parseInt(tipoPa.nequi);
            this.daviplata=this.daviplata+parseInt(tipoPa.daviplata);
            this.tarjeta=this.tarjeta+parseInt(tipoPa.tarjeta);
            this.banco=this.banco+parseInt(tipoPa.banco);
      });
    })
    this.service.getSalidasDia(mes,this.local).toPromise().then(result=>{
      this.rows=result;
      this.rows.forEach(element => {
        if(element.localU!=""){
          this.salida=this.salida+parseInt(element.valor);
          }else{
            this.salidaadic=this.salidaadic+parseInt(element.valor);
          }
      });
    })
    this.service.vales(mes,this.local).toPromise().then(result=>{
      let data=result;
      data.forEach(element => {
        this.vales=this.vales+parseInt(element.valor);
      });
    })
      this.spinner.hide();
  }
}
