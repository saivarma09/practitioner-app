import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonLabel, IonNote } from '@ionic/angular/standalone';

interface Correspondence {
  date: string;
  communicationType: 'Email' | 'Letter' | 'Phone' | 'SMS';
  from: string;
  recipient: string;
  status: 'Sent' | 'Received' | 'Draft' | 'Failed';
}

@Component({
  selector: 'app-correspondence',
  templateUrl: './correspondence.component.html',
  styleUrls: ['./correspondence.component.scss'],
  standalone: true,
  imports: [CommonModule, IonList, IonLabel, IonNote]
})
export class CorrespondenceComponent implements OnInit {
  correspondences: Correspondence[] = [
    {
      date: '2024-06-01',
      communicationType: 'Email',
      from: 'dr.smith@clinic.com',
      recipient: 'patient@email.com',
      status: 'Sent',
    },
    {
      date: '2024-05-28',
      communicationType: 'Letter',
      from: 'Clinic Reception',
      recipient: 'John Doe',
      status: 'Received',
    },
    {
      date: '2024-05-20',
      communicationType: 'Phone',
      from: 'Nurse Jane',
      recipient: 'Olivia Bennett',
      status: 'Failed',
    },
    {
      date: '2024-05-15',
      communicationType: 'SMS',
      from: 'Clinic System',
      recipient: 'Noah Thompson',
      status: 'Draft',
    },
  ];

  constructor() { }

  ngOnInit() {}

  editCorrespondence(item: Correspondence) {
    // Placeholder for edit action
    console.log('Edit correspondence:', item);
  }

  deleteCorrespondence(item: Correspondence) {
    this.correspondences = this.correspondences.filter(c => c !== item);
  }
}
