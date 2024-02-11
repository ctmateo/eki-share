import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-my-routes',
  templateUrl: './my-routes.component.html',
  styleUrls: ['./my-routes.component.sass']
})
export class MyRoutesComponent {

  customOptions: OwlOptions = {
    rtl:true,
    nav:false,
    loop:true,
    margin:10,
    dots: true,
    navSpeed: 200,
    autoplay:true,
    autoplayTimeout:5000,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
    // loop: true,
    // mouseDrag: false,
    // touchDrag: false,
    // pullDrag: false,
    // dots: true,
    // navSpeed: 200,
    // autoWidth: true,
    // autoHeight: true,
    // margin: 25,
    // center: true,
    // autoplay:true,
    // autoplayTimeout:5000,
  };

  courses:any = [
    {route:"Ruta de finanzas", progress: 10, color: "#FF4867", icon: ""},
    {route:"Ruta de liderazgo empresarial", progress: 80, color: "#FF9748", icon: ""},
    {route:"Ruta de ventas", progress: 30, color: "#7E48FF", icon: ""},
    {route:"Ruta de exportación", progress: 50, color: "#099838", icon: ""},
  ]
}
