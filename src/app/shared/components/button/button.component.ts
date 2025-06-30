import { Component, Input, OnInit } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  imports:[IonButton],
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent  implements OnInit {
  @Input() buttonLabel:string = '';
  @Input() buttonStatus:boolean = false;
  @Input() buttonType:string = 'solid';
  constructor() { }

  ngOnInit() {}

}
