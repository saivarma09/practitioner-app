import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonList, IonLabel, IonNote } from '@ionic/angular/standalone';

interface Insurer {
  name: string;
  membershipNumber: string;
  scheme: string;
  expiryDate: string;
  expired: boolean;
  status: 'Primary' | 'Secondary';
  verified: boolean;
}

@Component({
  selector: 'app-insurer',
  templateUrl: './insurer.component.html',
  styleUrls: ['./insurer.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonList, IonLabel, IonNote]
})
export class InsurerComponent implements OnInit {
  insurers: Insurer[] = [
    {
      name: 'Blue Cross',
      membershipNumber: 'BC123456',
      scheme: 'Gold',
      expiryDate: '2025-12-31',
      expired: false,
      status: 'Primary',
      verified: true,
    },
    {
      name: 'Aetna',
      membershipNumber: 'AE987654',
      scheme: 'Silver',
      expiryDate: '2023-06-30',
      expired: true,
      status: 'Secondary',
      verified: false,
    },
  ];

  constructor() { }

  ngOnInit() {}

  editInsurer(insurer: Insurer) {
    // Placeholder for edit action
    console.log('Edit insurer:', insurer);
  }

  unlinkInsurer(insurer: Insurer) {
    this.insurers = this.insurers.filter(i => i !== insurer);
  }

  verifyInsurer(insurer: Insurer) {
    insurer.verified = true;
    console.log('Verified insurer:', insurer);
  }
}
