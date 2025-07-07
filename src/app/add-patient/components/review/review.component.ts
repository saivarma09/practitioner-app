import { Component, OnInit } from '@angular/core';
import { AddPatientService } from '../../services/add-patient/add-patient.service';
import { CommonModule } from '@angular/common';
import { IonGrid, IonRow, IonCol, IonContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  imports: [CommonModule, IonGrid, IonRow, IonCol, IonContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel],
})
export class ReviewComponent implements OnInit {
  patientDetails: any;
  addressDetails: any;

  constructor(private addPatientService: AddPatientService) { }

  ngOnInit() {
    this.patientDetails = this.addPatientService.getPatientDetails();
    this.addressDetails = this.addPatientService.getAddressDetails();
    console.log(this.patientDetails);
    console.log(this.addressDetails);
  }
}
