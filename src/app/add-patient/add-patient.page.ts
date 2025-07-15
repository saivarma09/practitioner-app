import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, FormGroup } from '@angular/forms';
import { IonContent, IonHeader, IonRouterOutlet, IonToolbar } from '@ionic/angular/standalone';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { AddressComponent } from './components/address/address.component';
import { ReviewComponent } from './components/review/review.component';
import { IonProgressBar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonRouterOutlet, IonToolbar,IonProgressBar, CommonModule, FormsModule, PatientDetailsComponent, HeaderComponent, AddressComponent, ReviewComponent]
})
export class AddPatientPage implements OnInit {
  constructor(private fb: FormBuilder) { }
  stepCounter = '1'
  addStatus = 'details';
  patientForm = this.fb.group({
    patientDetails: this.fb.group({
      title: [''],
      firstName: [''],
      lastName: [''],
      initials: [''],
      dob: [''],
      gender: [''],
      language: ['']
    }),
    address: this.fb.group({
      type: [''],
      postalCode: [''],
      prefix: [''],
      initials: [''],
      addressLine1: [''],
      addressLine2: [''],
      addressLine3: [''],
      addressLine4: ['']
    })

  });


  ngOnInit() {
  }

}
