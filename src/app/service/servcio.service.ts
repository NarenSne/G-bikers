import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServcioService {
  baseUrl="./";
  private httpOptions={headers:new HttpHeaders({"Content-Type":"application/json"})};
  constructor(private http:HttpClient) { }

  signin(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"services/iniciar.php",JSON.stringify(datos))
  }
  signup(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"services/registro.php",JSON.stringify(datos))
  }
  registraSalida(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"services/salida.php",JSON.stringify(datos))
  }
  print(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"services/print.php",JSON.stringify(datos))
  }
  salidas(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"services/salidas.php",JSON.stringify(datos))
  }
  nuevovale(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"services/nuevovale.php",JSON.stringify(datos))
  }
  vales(datos:any,data:any):Observable<any>{
    return this.http.get(this.baseUrl+"services/valesdia.php?fecha="+datos+"&vitrina="+data)
  }
  getProducts(){
    return this.http.get(this.baseUrl+"services/signup.php")
  }
  integrar(){
    return this.http.get(this.baseUrl+"services/integrar.php")
  }
  getCiudades():Observable<any>{
    return this.http.get(this.baseUrl+"ciudad/getAll",this.httpOptions)
  }
  getPedidos():Observable<any>{
    return this.http.get(this.baseUrl+"services/verpedidos.php")
  }

  getPedidosDia(datas:any,data:any):Observable<any>{
    return this.http.get(this.baseUrl+"services/verpedidosdia.php?fecha="+datas+"&vitrina="+data)
  }
  getSalidasDia(datas:any,data:any):Observable<any>{
    return this.http.get(this.baseUrl+"services/salidadia.php?fecha="+datas+"&vitrina="+data)
  }
  getInventarios():Observable<any>{
    return this.http.get(this.baseUrl+"services/Inventarios.php")
  }
  getUsuarios():Observable<any>{
    return this.http.get(this.baseUrl+"services/usuarios.php")
  }
  setAdmin(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"auth/setAdmin",datos,this.httpOptions)
  }
  getReportes(datos:any):Observable<any>{
    return this.http.get(this.baseUrl+"reportes/getAll/"+datos,this.httpOptions)
  }
  getReportesLinea(datos:any,datas:any):Observable<any>{
    return this.http.get(this.baseUrl+"reportes/getAllMarca/"+datos+"/"+datas,this.httpOptions)
  }
  newPedido(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"services/guardar.php",JSON.stringify(datos))
  }
  savePedido(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"pedidos/savePedido",datos,this.httpOptions)
  }
  setProducts(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"services/functions.php",JSON.stringify(datos))
  }
  newProducto(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"services/nuevoproducto.php",JSON.stringify(datos))
  }
  saveProducts(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"product/editar",datos,this.httpOptions)
  }
  eliminarProductos(datos:any,data:any):Observable<any>{
    return this.http.get(this.baseUrl+"services/eliminarproducto.php?id="+datos+"&vitrina="+data)
  }
  eliminarPedido(datos:any):Observable<any>{
    return this.http.get(this.baseUrl+"services/eliminarpedidos.php?id="+datos)
  }
  eliminarSalidas(datos:any):Observable<any>{
    return this.http.get(this.baseUrl+"services/eliminarsalidas.php?id="+datos)
  }
  setInventarios(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"services/SubirInventario.php",JSON.stringify(datos))
  }
  pedidos(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"services/pedidos.php",JSON.stringify(datos),{headers:new HttpHeaders({"Content-Type":"text/plain"})})
  }
  pedidosfeha(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"services/pedidosfechas.php",JSON.stringify(datos),{headers:new HttpHeaders({"Content-Type":"text/plain"})})
  }
}
