import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonRouterOutlet, IonToolbar } from '@ionic/angular/standalone';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonRouterOutlet, IonToolbar, CommonModule, FormsModule, PatientDetailsComponent, HeaderComponent]
})
export class AddPatientPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
