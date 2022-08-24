import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServcioService } from 'src/app/service/servcio.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  
  p: number = 1;
  productoss: any;
  searchTerm: any="";
  info: any;
  productos: any;
  cantidad: any;
  constructor(public ngxSmartModalService: NgxSmartModalService,private sharedService:SharedService,private service:ServcioService, private spinner:NgxSpinnerService,private routera:ActivatedRoute) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem("Productos")){
      sessionStorage.setItem("Productos","[]")
    }
    this.service.getProducts().subscribe(result=> {this.productos=result;this.productos.shift()})
  }
  todos(){
    document.querySelector(".linneas").querySelectorAll(".col-md-2").forEach(fun=>{
      fun.classList.remove("active")
    })
    document.querySelector(".linneas").querySelectorAll(".col-md-2:nth-child(1)").forEach(fun=>{
      fun.classList.add("active")
    })
    this.productoss=this.productos;
  }
  kenxin(){
    document.querySelector(".linneas").querySelectorAll(".col-md-2").forEach(fun=>{
      fun.classList.remove("active")
    })
    document.querySelector(".linneas").querySelectorAll(".col-md-2:nth-child(2)").forEach(fun=>{
      fun.classList.add("active")
    })
    this.productoss=this.productos.filter(res=>res.marca.toLowerCase() == "kenxin");
  }
  laboratorio(){
    document.querySelector(".linneas").querySelectorAll(".col-md-2").forEach(fun=>{
      fun.classList.remove("active")
    })
    document.querySelector(".linneas").querySelectorAll(".col-md-2:nth-child(3)").forEach(fun=>{
      fun.classList.add("active")
    })
    this.productoss=this.productos.filter(res=>res.marca.toLowerCase() == "laboratorio");
  }
  quirurgico(){
    document.querySelector(".linneas").querySelectorAll(".col-md-2").forEach(fun=>{
      fun.classList.remove("active")
    })
    document.querySelector(".linneas").querySelectorAll(".col-md-2:nth-child(4)").forEach(fun=>{
      fun.classList.add("active")
    })
    this.productoss=this.productos.filter(res=>res.marca.toLowerCase().startsWith("medico quirurgico"));
  }
  instrumental(){
    document.querySelector(".linneas").querySelectorAll(".col-md-2").forEach(fun=>{
      fun.classList.remove("active")
    })
    document.querySelector(".linneas").querySelectorAll(".col-md-2:nth-child(5)").forEach(fun=>{
      fun.classList.add("active")
    })
    this.productoss=this.productos.filter(res=>res.marca.toLowerCase() == "instrumental quirurgico");
  }
  muebles(){
    document.querySelector(".linneas").querySelectorAll(".col-md-2").forEach(fun=>{
      fun.classList.remove("active")
    })
    document.querySelector(".linneas").querySelectorAll(".col-md-2:nth-child(6)").forEach(fun=>{
      fun.classList.add("active")
    })
    this.productoss=this.productos.filter(res=>res.marca.toLowerCase() == "muebles hospitalarios");
  }
  search(): void {
    let term = this.searchTerm;
    this.productoss= this.productos.filter(function(tag) {
        return tag.titulo.contains(term) >= 0;
    }); 
  
}
destacados(){
  this.productoss= this.productos.filter(function(tag) {
    return tag.destacado == true;
  })
}
descuento(){
  this.productoss= this.productos.filter(function(tag) {
    return tag.promocion == true;
  })
}
edit(row){
  this.info=row;
  setTimeout(a=>{
    this.ngxSmartModalService.getModal('myModal').open()
    this.ngxSmartModalService.setModalData(row,'myModal');
    console.log(this.ngxSmartModalService.getModalData('myModal'))
  },100)
}
add(a){
  this.info=null;
  this.cantidad=null;
  console.log(a);
  let product=JSON.parse(sessionStorage.getItem("Productos"))
  let added = {
    "cantidad":a,
    "producto":this.ngxSmartModalService.getModalData('myModal')
  }
  product.push(added);
  sessionStorage.setItem("Productos",JSON.stringify(product));
  this.sharedService.nextMessage(JSON.parse(sessionStorage.getItem("Productos")).length)
}
filter(a){
  this.productoss=this.productos.filter(res=>res.nombre.toLowerCase().includes(a.toLowerCase()));
}
}
