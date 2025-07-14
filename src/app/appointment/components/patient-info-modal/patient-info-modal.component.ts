import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {ModalController,
  IonCol, IonGrid, IonRow,
  IonContent,
  IonHeader} from '@ionic/angular/standalone';
@Component({
  selector: 'app-patient-info-modal',
  templateUrl: './patient-info-modal.component.html',
  styleUrls: ['./patient-info-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonCol, IonGrid, IonRow]
})
export class PatientInfoModalComponent {
  @Input() patient: any;

  constructor(private modalCtrl: ModalController) {}

  async close() {
    await this.modalCtrl.dismiss();
  }
}