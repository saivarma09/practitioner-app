import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { PatientInfoModalComponent } from '../patient-info-modal/patient-info-modal.component';
@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss'],
  standalone: true, // Add this if using standalone components
  imports: [IonicModule, CommonModule]
})
export class PatientInfoComponent {

  patient = {
    name: 'Olivia Bennett',
    address: '123 Main St, Springfield',
    age: 29,
    email: 'olivia.bennett@example.com',
    phone: '+1 555-123-4567'
  };

  constructor(private modalCtrl: ModalController) { }

  async onAvatarClick() {
    const modal = await this.modalCtrl.create({
      component: PatientInfoModalComponent,
      componentProps: {
        patient: this.patient
      },
      initialBreakpoint: 0.4,
      backdropDismiss: true
    });
    await modal.present();
  }
}
