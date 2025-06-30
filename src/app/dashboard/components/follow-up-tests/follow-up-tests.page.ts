import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow-up-tests',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './follow-up-tests.page.html',
  styleUrls: ['./follow-up-tests.page.scss']
})
export class FollowUpTestsPage {
  constructor(private router: Router) {}

  onPatientClick() {
    this.router.navigate(['/follow-up-test-results']);
  }
} 