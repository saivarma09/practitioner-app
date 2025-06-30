import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {  ModalController } from '@ionic/angular/standalone';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ClinicalNotesModelComponent } from '../clinical-notes-model/clinical-notes-model.component';

@Component({
  selector: 'app-clinical-notes',
  templateUrl: './clinical-notes.component.html',
  styleUrls: ['./clinical-notes.component.scss'],
  standalone: true,
  imports: [IonicModule,ButtonComponent, CommonModule]
})
export class ClinicalNotesComponent {
  notes = [
    { title: 'Follow-up', date: '10/26/2023' },
    { title: 'Diagnosis', date: '10/19/2023' },
    { title: 'Labs Ordered', date: '10/12/2023' }
  ];

  constructor(private modalCtrl: ModalController) {}

  async openAddNoteModal() {
    const modal = await this.modalCtrl.create({
      component: ClinicalNotesModelComponent,
      initialBreakpoint: 0.7,
      backdropDismiss: true
    });
    await modal.present();
  }
}
 