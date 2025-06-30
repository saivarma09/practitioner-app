import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'appointment',
    loadComponent: () => import('./appointment/appointment.page').then( m => m.AppointmentPage)
  },
  {
    path: 'patient',
    loadComponent: () => import('./patient/patient.page').then( m => m.PatientPage)
  },
];
