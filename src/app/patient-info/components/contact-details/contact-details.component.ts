import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonLabel, IonNote } from '@ionic/angular/standalone';

interface Address {
  type: string;
  postalCode: string;
  prefix: string;
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
      postalCode: '12345',
      prefix: 'Mr.',
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      addressLine3: '',
      city: 'New York',
      usage: 'Primary',
    },
    {
      type: 'Work',
      postalCode: '67890',
      prefix: 'Ms.',
      addressLine1: '456 Business Rd',
      addressLine2: '',
      addressLine3: '',
      city: 'San Francisco',
      usage: 'Billing',
    },
  ];

  telecoms: Telecom[] = [
    { type: 'Mobile', number: '+1 555-123-4567', option: 'Primary' },
    { type: 'Home', number: '+1 555-987-6543', option: 'Preferred' },
  ];

  constructor() { }

  ngOnInit() {}

  addAddress() {
    this.addresses.push({
      type: '', postalCode: '', prefix: '', addressLine1: '', addressLine2: '', addressLine3: '', city: '', usage: 'Primary'
    });
  }

  addTelecom() {
    this.telecoms.push({ type: '', number: '', option: 'Primary' });
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
