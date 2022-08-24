import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Router } from '@angular/router';
import { NguCarousel, NguCarouselStore } from '@ngu/carousel';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public carouselTileItems: Array<any> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,];
  carouselBanner:any={
    grid: { xs: 1, sm: 2, md: 3, lg: 3, xl:4, all: 2 },
    speed: 400,
    interval: {
      timing: 3000,
      initialDelay: 1000
    },
    point: {
      visible: true
    },
    load: 2,
    loop: true,
    touch: true
  };


  constructor(private router:Router) { }

  ngOnInit(): void {
    AOS.init();
  }
  Contacto(){
    this.router.navigate(['Contacto'])
  }
  inicio(){
    this.router.navigate(['Inicio'])
  }
  productos(a){
    this.router.navigate(['Productos'],{queryParams:{type:a}})
  }
}
