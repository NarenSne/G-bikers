import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  shared:any;
  constructor() { }
  setData(aa){
    sessionStorage.setItem("Data",JSON.stringify(aa))
    this.shared=aa;
  }
  getData(){
    this.shared=JSON.parse(sessionStorage.getItem("Data"));
  }
}
