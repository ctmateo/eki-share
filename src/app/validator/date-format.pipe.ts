import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    const inputDate = new Date(value)
    const now = new Date();
    const diff = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

    if (diff < 60) {
      return 'Hoy hace menos de un minuto';
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `Hoy hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    } else if (diff < 86400 && now.getDate() === inputDate.getDate()) {
      const hours = Math.floor(diff / 3600);
      return `Hoy hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else if (
      diff < 172800 &&
      now.getDate() - inputDate.getDate() === 1 &&
      now.getHours() >= inputDate.getHours()
    ) {
      const minutes = inputDate.getMinutes();
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      return `Ayer a las ${inputDate.getHours()}:${formattedMinutes}`;
    } else {
      const day = inputDate.getDate();
      const month = inputDate.toLocaleString('es', { month: 'long' });
      const hours = inputDate.getHours();
      const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
      const minutes = inputDate.getMinutes();
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      return `${day} de ${month} a las ${formattedHours}:${formattedMinutes}`;
    }
  }

}
