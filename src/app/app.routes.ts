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
  {
    path: 'add-patient',
    loadComponent: () => import('./add-patient/add-patient.page').then( m => m.AddPatientPage),
    children: [
      {
        path: '',
        redirectTo: 'patient-details',
        pathMatch: 'full',
      },
      {
        path: 'patient-details',
        loadComponent: () => import('./add-patient/components/patient-details/patient-details.component').then( m => m.PatientDetailsComponent)
      },
      {
        path: 'address-details',
        loadComponent: () => import('./add-patient/components/address/address.component').then( m => m.AddressComponent)
      },
      {
        path: 'review',
        loadComponent: () => import('./add-patient/components/review/review.component').then( m => m.ReviewComponent)
      },
      {
        path: 'patient',
        loadComponent: () => import('./patient/patient.page').then( m => m.PatientPage)
      },
      {
        path: 'patient-info',
        loadComponent: () => import('./patient-info/patient-info.page').then( m => m.PatientInfoPage)
      }
    ] 
  },
  {
    path: 'patient-info',
    loadComponent: () => import('./patient-info/patient-info.page').then( m => m.PatientInfoPage)
  }
];
