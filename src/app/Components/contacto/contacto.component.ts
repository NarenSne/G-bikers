import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ServcioService } from 'src/app/service/servcio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  form: FormGroup;

  constructor(private router:Router,private modalService: NgbModal, private service:ServcioService) { }
  closeResult = '';
  ngOnInit(): void {
    this.form = new FormGroup({
      nombre:new FormControl('',[Validators.required]),
      correo:new FormControl('',[Validators.required]),
      telefono:new FormControl('',[Validators.required]),
      dedica:new FormControl('',[Validators.required]),
      persona:new FormControl('',[Validators.required]),
      desc:new FormControl('',[Validators.required])
    })  
  }
  enviar(){
    if(this.form.valid){
      let datos={
        "nombre": this.form.get("nombre").value,
        "correo": this.form.get("correo").value,
        "telefono": this.form.get("telefono").value,
        "dedica":this.form.get("dedica").value,
        "persona":this.form.get("persona").value,
        "comentario":this.form.get("desc").value
      }
      
    }else{
      this.form.markAllAsTouched()
    }
  }
}
