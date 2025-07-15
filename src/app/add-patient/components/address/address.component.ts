import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { IonGrid, IonRow, IonCol, IonContent, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Router } from '@angular/router';
import { AddPatientService } from '../../services/add-patient/add-patient.service';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule, IonGrid, IonRow, IonCol, IonContent, IonInput,  IonSelect, IonSelectOption, ButtonComponent]
})
export class AddressComponent implements OnInit {
 @Input() addressForm!:FormGroup | any;

  typeOptions = [
    { label: 'Home', value: 'home' },
    { label: 'Work', value: 'work' },
    { label: 'Other', value: 'other' }
  ];

  constructor(private fb: FormBuilder, private router: Router, private addPatientService: AddPatientService ) {
  }

  ngOnInit() {}

}
