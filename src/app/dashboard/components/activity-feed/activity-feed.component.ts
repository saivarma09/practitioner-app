import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-activity-feed',
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ActivityFeedComponent implements OnInit {
  activities = [
    {
      icon: 'fa-regular fa-calendar',
      title: 'Completed Appointment',
      subtitle: 'Consultation with Isabella',
      time: '2h ago',
    },
    {
      icon: 'fa-regular fa-user',
      title: 'Patient Added',
      subtitle: 'New patient registration',
      time: '4h ago',
    },
  ];

  constructor() { }

  ngOnInit() {}

}
