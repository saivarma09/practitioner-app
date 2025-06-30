import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { AllergiesComponent } from './components/allergies/allergies.component';
import { VitalsComponent } from './components/vitals/vitals.component';
import { ClinicalNotesComponent } from './components/clinical-notes/clinical-notes.component';
import { HeaderComponent } from "../shared/components/header/header.component";
import { ModalController } from '@ionic/angular';
import { PatientInfoModalComponent } from './components/patient-info-modal/patient-info-modal.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonContent, 
    IonHeader, 
    IonToolbar,
    PatientInfoComponent, 
    AllergiesComponent, 
    VitalsComponent,
    ClinicalNotesComponent, 
    HeaderComponent
  ]
})
export class AppointmentPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openPatientInfoModal(patient: any) {
    console.log('Opening patient info modal for:', patient);
    console.log('Opening patient info modal with patient:', patient);
    
    try {
      // Dismiss any existing modals first
      await this.modalCtrl.dismiss().catch(() => {});
      
      const modal = await this.modalCtrl.create({
        component: PatientInfoModalComponent,
        componentProps: { 
          patient: patient 
        },
        cssClass: 'patient-info-modal',
        showBackdrop: true,
        backdropDismiss: true,
        animated: true,
        // For mobile, you might want to use different breakpoints
        breakpoints: [0, 0.45, 0.75, 1],
        initialBreakpoint: 0.5,
        handle: false
      });

      await modal.present();
      
      const { data } = await modal.onWillDismiss();
      console.log('Modal dismissed with data:', data);
      
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  }
}