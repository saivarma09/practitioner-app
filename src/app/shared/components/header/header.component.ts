import { Component, Input, OnInit } from '@angular/core';
import { IonTitle } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports:[IonTitle],
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() pageTitle:string = '';
  constructor(private navController:NavController) { }

  ngOnInit() {}


  backPage(){
    this.navController.back()
  }

}
