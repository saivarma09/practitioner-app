import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonLabel, IonNote } from '@ionic/angular/standalone';

interface Address {
  type: string;
  icon: string;
  postalCode: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  usage: 'Primary' | 'Billing' | 'Primary and Billing';
}

interface Telecom {
  type: string;
  number: string;
  option: 'Primary' | 'Preferred';
  icon: string;
}

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  standalone: true,
  imports: [CommonModule, IonList, IonLabel, IonNote]
})
export class ContactDetailsComponent implements OnInit {
  addresses: Address[] = [
    {
      type: 'Home',
      icon: 'fa-light fa-house',
      postalCode: '12345',
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      addressLine3: '',
      city: 'New York',
      usage: 'Primary',
    },
    {
      type: 'Work',
      icon: 'fa-light fa-building',
      postalCode: '67890',
      addressLine1: '456 Business Rd',
      addressLine2: '',
      addressLine3: '',
      city: 'San Francisco',
      usage: 'Billing',
    },
  ];

  telecoms: Telecom[] = [
    { type: 'Mobile', number: '+1 555-123-4567', option: 'Primary', icon: 'fa-light fa-mobile' },
    { type: 'Home', number: '+1 555-987-6543', option: 'Preferred', icon: 'fa-light fa-house' },
  ];

  constructor() { }

  ngOnInit() {}

  addAddress() {
    this.addresses.push({
      type: '', icon: '', postalCode: '', addressLine1: '', addressLine2: '', addressLine3: '', city: '', usage: 'Primary'
    });
  }

  addTelecom() {
    this.telecoms.push({ type: '', number: '', option: 'Primary', icon: '' });
  }

  editAddress(address: Address) {
    console.log('Edit address:', address);
  }

  deleteAddress(address: Address) {
    this.addresses = this.addresses.filter(a => a !== address);
  }

  editTelecom(telecom: Telecom) {
    console.log('Edit telecom:', telecom);
  }

  deleteTelecom(telecom: Telecom) {
    this.telecoms = this.telecoms.filter(t => t !== telecom);
  }
}
