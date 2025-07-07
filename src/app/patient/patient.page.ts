import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from '../shared/components/header/header.component';
import { IonSearchbar, IonList, IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

interface Patient {
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  date: string;
  name: string;
  dob: string;
  gender: string;
}

const PATIENTS: Patient[] = [
  { status: 'Scheduled', date: '07/15/2024', name: 'Ethan Carter', dob: '05/12/1988', gender: 'Male' },
  { status: 'Completed', date: '07/10/2024', name: 'Olivia Bennett', dob: '09/20/1975', gender: 'Female' },
  { status: 'Cancelled', date: '07/05/2024', name: 'Noah Thompson', dob: '02/08/1992', gender: 'Male' },
  { status: 'Scheduled', date: '07/20/2024', name: 'Sophia Harper', dob: '11/15/1960', gender: 'Female' },
  { status: 'Completed', date: '07/01/2024', name: 'Liam Foster', dob: '03/22/1985', gender: 'Male' },
  { status: 'Scheduled', date: '07/25/2024', name: 'Isabella Hayes', dob: '07/01/1970', gender: 'Female' },
];

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, IonSearchbar, IonList, IonItem, IonLabel, IonNote, IonCard, IonCardContent, IonIcon]
})
export class PatientPage implements OnInit {
  patients: Patient[] = PATIENTS;
  searchTerm: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get filteredPatients(): Patient[] {
    if (!this.searchTerm) return this.patients;
    const term = this.searchTerm.toLowerCase();
    return this.patients.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.dob.includes(term) ||
      p.gender.toLowerCase().includes(term)
    );
  }

  onPatientClick(patient: Patient) {
    this.router.navigate(['/patient-info']);
  }
}
