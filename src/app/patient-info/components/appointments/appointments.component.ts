import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonList, IonLabel, IonNote, IonSearchbar } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

interface Appointment {
  name: string;
  location: string;
  type: string;
  dateTime: string;
  status: 'Confirmed' | 'Cancelled';
}

const APPOINTMENTS: Appointment[] = [
  { name: 'John Doe', location: 'Room 101', type: 'Knee Surgery', dateTime: '2024-07-15 09:00', status: 'Confirmed' },
  { name: 'Jane Smith', location: 'Room 202', type: 'Appendectomy', dateTime: '2024-07-16 11:30', status: 'Cancelled' },
  { name: 'Alice Johnson', location: 'Room 303', type: 'Hip Replacement', dateTime: '2024-07-17 14:00', status: 'Confirmed' },
  { name: 'Bob Brown', location: 'Room 404', type: 'Gallbladder Removal', dateTime: '2024-07-18 08:00', status: 'Confirmed' },
  { name: 'Carol White', location: 'Room 505', type: 'Cataract Surgery', dateTime: '2024-07-19 10:15', status: 'Cancelled' },
];

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonList, IonLabel, IonNote, IonSearchbar,
    HeaderComponent
  ]
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = APPOINTMENTS;
  searchTerm: string = '';

  constructor() { }

  ngOnInit() {}

  get filteredAppointments(): Appointment[] {
    if (!this.searchTerm) return this.appointments;
    const term = this.searchTerm.toLowerCase();
    return this.appointments.filter(a =>
      a.name.toLowerCase().includes(term) ||
      a.location.toLowerCase().includes(term) ||
      a.type.toLowerCase().includes(term) ||
      a.dateTime.toLowerCase().includes(term) ||
      a.status.toLowerCase().includes(term)
    );
  }

  onAppointmentClick(appointment: Appointment) {
    // Placeholder for click action, e.g., open details modal
    console.log('Appointment clicked:', appointment);
  }
}
