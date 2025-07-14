import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonList, IonItem, IonLabel, IonNote, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonSegment, IonSegmentButton, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { HeaderComponent } from '../shared/components/header/header.component';
// Patient Info Tab Components
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { CorrespondenceComponent } from './components/correspondence/correspondence.component';
import { DiagnosticsComponent } from './components/diagnostics/diagnostics.component';
import { InsurerComponent } from './components/insurer/insurer.component';
import { MedicalHistoryComponent } from './components/medical-history/medical-history.component';
import { MedicationListComponent } from './components/medication-list/medication-list.component';
import { NotesComponent } from './components/notes/notes.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ClinicalNotesComponent } from './components/clinical-notes/clinical-notes.component';
import { AllergiesComponent } from './components/allergies/allergies.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.page.html',
  styleUrls: ['./patient-info.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, CommonModule, FormsModule,
    HeaderComponent,
    IonList, IonItem, IonLabel, IonNote, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonSegment, IonSegmentButton,
    IonFab, IonFabButton
  ]
})
export class PatientInfoPage implements OnInit {
  tabs: string[] = [
    'Appointments',
    'Correspondence',
    // 'Diagnostics',
    'Insurer',
    // 'Medical history',
    // 'Medication list',
    // 'Notes',
    // 'Tasks',
    // 'Clinical notes',
    'Allergies',
    'Contact details'
  ];
  selectedTab: string = this.tabs[0];

  // Map tab names to component classes
  tabComponentMap: { [key: string]: any } = {
    'Appointments': AppointmentsComponent,
    'Correspondence': CorrespondenceComponent,
    'Diagnostics': DiagnosticsComponent,
    'Insurer': InsurerComponent,
    'Medical history': MedicalHistoryComponent,
    'Medication list': MedicationListComponent,
    'Notes': NotesComponent,
    'Tasks': TasksComponent,
    'Clinical notes': ClinicalNotesComponent,
    'Allergies': AllergiesComponent,
    'Contact details': ContactDetailsComponent
  };

  copiedMRN = false;

  constructor(private clipboard: Clipboard) { }

  ngOnInit() {
  }

  onTabChange(tab: any) {
    this.selectedTab = String(tab);
  }

  copyMRN(mrn: string) {
    this.clipboard.copy(mrn);
    this.copiedMRN = true;
    setTimeout(() => this.copiedMRN = false, 1200);
  }

  onFabClick() {
    // Example: open add note modal or action sheet
    alert('FAB clicked! Add your quick action here.');
  }
}
