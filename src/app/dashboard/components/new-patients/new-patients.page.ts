import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-patients',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './new-patients.page.html',
  styleUrls: ['./new-patients.page.scss']
})
export class NewPatientsPage {} 