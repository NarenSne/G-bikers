import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServcioService } from 'src/app/service/servcio.service';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-lista',
  templateUrl: './mi-lista.component.html',
  styleUrls: ['./mi-lista.component.css']
})
export class MiListaComponent implements OnInit {
  comentarios:any=[];
  name="";
  tipo="";
  identif="";
  user="";
  direccion="";
  telefono="";
  Cuidad="";
  negocio="";
  persona="";
  form:FormGroup;
  ciudades: any;
  usuario: any;
  constructor(private router:Router, private service:ServcioService, private Spinner:NgxSpinnerService,private sharedService:SharedService) { }
  ngOnInit(): void {
    let productos=JSON.parse(sessionStorage.getItem("Productos"));
    if(productos==null){
      this.comentarios=[]
    }else{
      this.comentarios=productos
    }
    this.usuario=JSON.parse(sessionStorage.getItem("Usuario"));
    if(sessionStorage.getItem("Usuario")==null){
      this.form = new FormGroup({
        name:new FormControl('',[Validators.required]),
        tipo:new FormControl('',[Validators.required]),
        identif:new FormControl('',[Validators.required]),
        user:new FormControl('',[Validators.required]),
        direccion:new FormControl('',[Validators.required]),
        telefono:new FormControl('',[Validators.required]),
        Cuidad:new FormControl('',[Validators.required]),
        negocio:new FormControl('',[Validators.required]),
        persona:new FormControl('',[Validators.required]),
        Comentario:new FormControl('',[])
      })  
    }else{
      this.form = new FormGroup({
        name:new FormControl(this.usuario.nombre,[Validators.required]),
        tipo:new FormControl('',[Validators.required]),
        identif:new FormControl('',[Validators.required]),
        user:new FormControl(this.usuario.email,[Validators.required]),
        direccion:new FormControl('',[Validators.required]),
        telefono:new FormControl(this.usuario.celular,[Validators.required]),
        Cuidad:new FormControl('',[Validators.required]),
        negocio:new FormControl('',[Validators.required]),
        persona:new FormControl('',[Validators.required]),
        Comentario:new FormControl('',[])
      })
  
    }
    this.Spinner.show();
    this.service.getCiudades().toPromise().then(res=>{
      this.ciudades=res;
      this.Spinner.hide();
    })
  }
  eliminar(a){
    this.comentarios=this.comentarios.filter(llamada=> llamada.producto.codigo != a);
    sessionStorage.setItem("Productos",JSON.stringify(this.comentarios))
  }
  pedidos(){
    if(this.form.valid){
      this.Spinner.show();
      let datos={
        "nombre":this.form.get("name").value,
        "fecha":new Date().toJSON(),
        "tipoDoc":this.form.get("tipo").value,
        "numDoc":this.form.get("identif").value,
        "correo":this.form.get("user").value,
        "direccion":this.form.get("direccion").value,
        "telefono":this.form.get("telefono").value,
        "ciudad":this.Cuidad,
        "observaciones":this.form.get("Comentario").value,
        "estado":"Pendiente",
        "productos":JSON.parse(sessionStorage.getItem("Productos")),
        "dedica":this.form.get("negocio").value,
        "persona":this.form.get("persona").value,
      }
      console.log(datos)
      this.service.newPedido(datos).toPromise().then(res=>{
        this.Spinner.hide();
        Swal.fire(
          'Felicidades',
          'Hemos comenzado la solicitud de tu pedido, nos contactaremos contigo para validar contigo',
          'success'
        )
        this.form.reset();
        sessionStorage.setItem("Productos","[]");
        this.comentarios=[];
        this.sharedService.nextMessage("0");
      })
    }else{
      this.form.markAllAsTouched()
    }
  }
  disminuir(comen){
    comen.cantidad=comen.cantidad-1;
    if(comen.cantidad==0){
      let productos=JSON.parse(sessionStorage.getItem("Productos"));
      productos=productos.filter(function(el) { return el.producto.codigo !== comen.producto.codigo; })
      sessionStorage.setItem("Productos",JSON.stringify(productos));
      this.comentarios=this.comentarios.filter(function(el) { return el.producto.codigo !== comen.producto.codigo; }); 
    }
  }
  add(comen){
    comen.cantidad=comen.cantidad+1;
  }
}
