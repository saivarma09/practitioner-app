import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddPatientService {
  private patientDetails: any = null;
  private addressDetails: any = null;

  setPatientDetails(details: any) {
    this.patientDetails = details;
  }

  getPatientDetails() {
    return this.patientDetails;
  }

  setAddressDetails(details: any) {
    this.addressDetails = details;
  }

  getAddressDetails() {
    return this.addressDetails;
  }

  constructor() { }
}
