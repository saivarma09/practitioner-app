import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class VitalsComponent {
  vitals = [
    { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal' },
    { label: 'Heart Rate', value: 72, unit: 'bpm', status: 'normal' },
    { label: 'Temperature', value: 101.2, unit: '°F', status: 'high' },
    { label: 'SpO2', value: 92, unit: '%', status: 'low' },
    { label: 'Weight', value: 150, unit: 'lbs', status: 'normal' }
  ];
} 