import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ServcioService } from 'src/app/service/servcio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  columns = [{ name:'nombre' },{name:'email'}, { name: 'celular' }];
  loadingIndicator = true;
  reorderable = true;
  rows:any;
  ColumnMode = ColumnMode;
  constructor(private service:ServcioService) { }

  ngOnInit(): void {
    this.service.getUsuarios().toPromise().then(res=>{
      this.rows=res
    })
  }
  detalle(a,b){
    Swal.fire({
      title: '¿Quieres cambiarle el rol al usuario?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        let datos ={};
        if(b=="ROLE_USER"){
          datos ={
            "id":a,
            "role":["admin"]
          }  
        }else{
          datos ={
            "id":a,
            "role":["user"]
          }
        }

        this.service.setAdmin(datos).toPromise().then(res=>{
          Swal.fire('Se le a cambiado el rol al usuario', '', 'success');
        })
      } 
    })
  }
}
