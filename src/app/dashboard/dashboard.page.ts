import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivityFeedComponent } from './components/activity-feed/activity-feed.component';
import { HealthAnalyticsComponent } from './components/health-analytics/health-analytics.component';
import { PatientFeedbackComponent } from './components/patient-feedback/patient-feedback.component';
import { PatientSearchComponent } from './components/patient-search/patient-search.component';
import { PendingActionsComponent } from './components/pending-actions/pending-actions.component';
import { QuickStatsComponent } from './components/quick-stats/quick-stats.component';
import { RevenueAnalyticsComponent } from './components/revenue-analytics/revenue-analytics.component';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ScheduleListComponent, QuickStatsComponent, PendingActionsComponent, ActivityFeedComponent, PatientSearchComponent, RevenueAnalyticsComponent, PatientFeedbackComponent, HealthAnalyticsComponent]
})
export class DashboardPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSelectedAppointment(appointmentInfo:any){
    this.router.navigate(['/appointment']);
    
  }

}
