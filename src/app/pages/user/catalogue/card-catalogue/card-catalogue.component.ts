import { Component, Input } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

interface itemCard {
  id: string,
  contentId: string,
  description: string;
  title: string;
  image: string;
  count: string;
  counType: string;
  tags: any[]
}

@Component({
  selector: 'app-card-catalogue',
  templateUrl: './card-catalogue.component.html',
  styleUrls: ['./card-catalogue.component.sass']
})
export class CardCatalogueComponent {
  defaultImage = "https://eki-public.s3.amazonaws.com/no_data.jpg"
  @Input() item: itemCard = {
    id: "",
    contentId: "",
    description: "",
    title: "",
    image: "",
    count: "",
    counType: "Cursos",
    tags: []
  }
  @Input() type: string = ""

  constructor(public utils: UtilsService) {
    
   }

  ngOnInit() {
    // console.log("item", this.item)
  }

  noImage(event: any) {
    event.target.src = this.defaultImage;
  }

  gotoDetail(){
    if(this.type != 'Path' && this.type != 'Course'){
      this.utils.goToRouter(`collaborator/multimedia/${this.item.id}?type=${this.type}`)
    }

    if(this.type == 'Course'){
      this.utils.goToRouter(`collaborator/detailCourse/course/${this.item.id}?type=${this.type}`)
    }
  }
}
