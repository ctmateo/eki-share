import { Component } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.sass']
})
export class MyCoursesComponent {

  constructor(private utils: UtilsService) {

  }

  courses: any = [
    { percent: 40, chip1: "Microempresa", chip2: "Finanzas", hour: 10, class: 6, name: 'Tome las riendas de su dinero', descriptionEs: 'Descubrirás cómo manejar tu tiempo adecuadamente puede marcar la diferencia en tu vida, incluyendo tus finanzas.', imageCourse: 'https://eki-public.s3.amazonaws.com/tags/Asociatividad+y+cooperativismo.jpg', id: "4de36089-3bbb-4752-a794-73aba84a80ca" },
    { percent: 10, chip1: "Agrocología", chip2: "Prácticas Agrícolas", hour: 14, class: 10, name: 'Introducción a un modelo de negocio rural sostenible', descriptionEs: 'Descubriremos en 5 módulos fundamentales los secretos de una gestión efectiva para impulsar su emprendimiento en entornos rurales.', imageCourse: 'https://eki-public.s3.amazonaws.com/tags/Manejo-Basico-del-Computador.jpg', id: '85239aa9-5a7f-45b4-8400-eb82d6932323' },
  ]

  goToCourse(id) {
    this.utils.goToRouter(`collaborator/detailCourse/course/${id}?type=Course`)
  }
}
