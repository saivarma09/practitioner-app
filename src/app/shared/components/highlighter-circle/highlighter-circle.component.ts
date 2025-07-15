import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-highlighter-circle',
  templateUrl: './highlighter-circle.component.html',
  styleUrls: ['./highlighter-circle.component.scss'],
  imports:[CommonModule]
})
export class HighlighterCircleComponent  implements OnInit {
@Input() requiredClass:string = ''

  constructor() { }

  ngOnInit() {}

}
