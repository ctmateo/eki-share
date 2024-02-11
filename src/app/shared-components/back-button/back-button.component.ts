import { Component, Input } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.sass']
})
export class BackButtonComponent {

  @Input() url: string | undefined;

  constructor(
    private utils: UtilsService
  ) { }

  back() {
    if (this.url != undefined)
      this.utils.goToRouter(this.url)
  }

}
