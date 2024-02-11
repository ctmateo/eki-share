import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.sass']
})
export class PollComponent {
  infoGroup = new FormGroup({
    birthday: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    jobField: new FormControl('', Validators.required),
  });
  
  interestGroup = new FormGroup({

  });

  constructor() {}

  ngOnInit(){
    this.onChanges();
  }
  onChanges(): void {
    this.infoGroup.valueChanges.subscribe(val => {
      console.log(val);
    });
  }
}
