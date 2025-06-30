import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-clinical-notes-model',
  templateUrl: './clinical-notes-model.component.html',
  styleUrls: ['./clinical-notes-model.component.scss'],
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons]
})
export class ClinicalNotesModelComponent implements OnInit {
  barHeights: number[] = [12, 28, 48, 56, 60, 56, 48, 36, 24, 16, 12, 16, 24, 36, 48, 56, 60, 56, 48, 28, 12];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.shuffleBars();
  }

  shuffleBars() {
    // Fisher-Yates shuffle
    for (let i = this.barHeights.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.barHeights[i], this.barHeights[j]] = [this.barHeights[j], this.barHeights[i]];
    }
  }

  async close() {
    await this.modalCtrl.dismiss();
  }
}
