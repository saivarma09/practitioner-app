import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { IonGrid, IonRow, IonCol, IonContent, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Router } from '@angular/router';
import { AddPatientService } from '../../services/add-patient/add-patient.service';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule, IonGrid, IonRow, IonCol, IonContent, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, ButtonComponent]
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;

  typeOptions = [
    { label: 'Home', value: 'home' },
    { label: 'Work', value: 'work' },
    { label: 'Other', value: 'other' }
  ];

  constructor(private fb: FormBuilder, private router: Router, private addPatientService: AddPatientService ) {
    this.addressForm = this.fb.group({
      type: [''],
      postalCode: [''],
      prefix: [''],
      initials: [''],
      addressLine1: [''],
      addressLine2: [''],
      addressLine3: [''],
      addressLine4: ['']
    });
  }

  ngOnInit() {}

  navigateToIdentifiers() {
    this.addPatientService.setAddressDetails(this.addressForm.value);
    this.router.navigate(['/add-patient/review']);
  }
}
