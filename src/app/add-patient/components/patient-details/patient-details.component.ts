import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonLabel, IonContent } from '@ionic/angular/standalone';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { Router } from '@angular/router';
import { AddPatientService } from '../../services/add-patient/add-patient.service';
@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatSelectModule, ButtonComponent,MatFormFieldModule, MatInputModule,MatDatepickerModule, HeaderComponent, IonList, IonItem,IonContent, IonInput, IonSelect,IonLabel, IonSelectOption, IonGrid, IonRow, IonCol]
})
export class PatientDetailsComponent implements OnInit {

  patientForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private addPatientService: AddPatientService) {
    this.patientForm = this.fb.group({
      title: [''],
      firstName: [''],
      lastName: [''],
      initials: [''],
      dob: [''],
      gender: [''],
      language: ['']
    });
  }

  ngOnInit() {}

  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];

  languageOptions = [
    { label: 'English', value: 'english' },
    { label: 'Spanish', value: 'spanish' },
    { label: 'French', value: 'french' },
    { label: 'Other', value: 'other' }
  ];


  navigateToAddressDetails() {
    this.addPatientService.setPatientDetails(this.patientForm.value);
    this.router.navigate(['/add-patient/address-details']);
  }
}
