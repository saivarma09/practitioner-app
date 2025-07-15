import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AddPatientService } from '../../services/add-patient/add-patient.service';
@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, IonContent, IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol]
})
export class PatientDetailsComponent implements OnInit {
@Input() patientForm!:FormGroup | any

  constructor(private fb: FormBuilder, private router: Router, private addPatientService: AddPatientService) {

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

}
