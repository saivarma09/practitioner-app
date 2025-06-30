// Add this at the very top to declare the odometer module for TypeScript
// @ts-ignore
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import Odometer from 'odometer';

@Component({
  selector: 'app-quick-stats',
  templateUrl: './quick-stats.component.html',
  styleUrls: ['./quick-stats.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class QuickStatsComponent implements OnInit, AfterViewInit {
  @ViewChild('appointmentsOdometer', { static: false }) appointmentsOdometer!: ElementRef;
  @ViewChild('revenueOdometer', { static: false }) revenueOdometer!: ElementRef;
  @ViewChild('satisfactionOdometer', { static: false }) satisfactionOdometer!: ElementRef;

  appointments: number = 0;
  revenue: number = 0;
  satisfaction: number = 0;

  private appointmentsTarget = 12;
  private revenueTarget = 2500;
  private satisfactionTarget = 95;

  private appointmentsOdo: any;
  private revenueOdo: any;
  private satisfactionOdo: any;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.appointmentsOdo = new Odometer({ el: this.appointmentsOdometer.nativeElement, value: 0 });
    this.revenueOdo = new Odometer({ el: this.revenueOdometer.nativeElement, value: 0, format: '(,ddd)' });
    this.satisfactionOdo = new Odometer({ el: this.satisfactionOdometer.nativeElement, value: 0 });
    setTimeout(() => {
      this.appointmentsOdo.update(this.appointmentsTarget);
      this.revenueOdo.update(this.revenueTarget);
      this.satisfactionOdo.update(this.satisfactionTarget);
    }, 300);
  }
}
