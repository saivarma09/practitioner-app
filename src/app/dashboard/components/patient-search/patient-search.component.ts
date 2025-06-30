import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class PatientSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
