import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import { ServcioService } from '../../service/servcio.service'
import {SharedService} from '../../shared.service'
declare const $: any;
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @ViewChild('cambiar', { static: false }) cambiar: ElementRef;
  @ViewChild('nueva', { static: false }) nuevaa: ElementRef;
  constructor(private router:Router,private modalService: NgbModal,private sharedService:SharedService, private data:ServcioService,private spinner:NgxSpinnerService) { }
  closeResult = '';
  constrase="";
  user="";
  form:FormGroup;
  producto:any;
  ngOnInit(): void {
    this.form = new FormGroup({
      name:new FormControl('',[Validators.required, Validators.maxLength(120)]),
      celular:new FormControl('',[Validators.required, Validators.maxLength(13)]),
      correo:new FormControl('',[Validators.required,Validators.maxLength(50)] ),
      password:new FormControl('',[Validators.required,Validators.maxLength(40),Validators.minLength(6)]),
      terminos:new FormControl('',[Validators.requiredTrue])
    })
    this.sharedService.sharedMessage.subscribe(message => this.producto = message)
  }
  pedidos(){
    this.router.navigate(['Pedidos'])
  }
  MiLista(){
    this.router.navigate(['MiLista'])
  }
  Contacto(){
    this.router.navigate(['Contacto'])
  }
  productos(){
    this.router.navigate(['Productos'])
  }
  inicio(){
    this.router.navigate(['Inicio'])
  }
  show:any=sessionStorage.getItem('Token')==null;
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  iniciar(){
    this.spinner.show();
    var datos={"username":this.user,"password":this.constrase}
    console.log(datos);
    this.data.signin(datos).toPromise().then(result=>{
      console.log(result);
      this.spinner.hide();
      $("#exampleModal").modal("hide");
      this.show=true;
      sessionStorage.setItem("Usuario",JSON.stringify(result));
      if(result.Tipo=='ROLE_USER'){
        this.show=false;
        this.router.navigate(['Inicio']);
      }else{
        if(result.Tipo=='Admin'){
          this.router.navigate(['Pedidos'])
        }else{
          this.router.navigate(['Caja'])
        }
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
  signup(){
    if(this.form.valid){
      this.spinner.show();
      let datos={
        "email":this.form.get("correo").value,
        "username":this.form.get("correo").value,
        "password":this.form.get("password").value,
        "celular":this.form.get("celular").value,
        "nombre":this.form.get("name").value,
        "Tipo":"ROLE_USER"
      }
      this.data.signup(datos).toPromise().then(res=>{
        this.spinner.hide();
        this.form.reset();
        this.form.markAsUntouched();
        Swal.fire('Te has registrado',
         'Ahora podras iniciar sesion para ver el seguimiento de tus productos',
         'success').then(res=>{
          $("#exampleModal2").modal('close')
          $("#exampleModal").modal('open');
         })
      }).catch(res=>{
        this.spinner.hide()
      })
    }else{

    }
  }
}
