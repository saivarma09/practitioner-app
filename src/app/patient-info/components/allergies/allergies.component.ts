import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonList, IonLabel, IonNote, IonSearchbar } from '@ionic/angular/standalone';

interface Allergy {
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Fatal' | 'Life-threatening';
  type: string;
  allergen: string;
  allergenCode: string;
  notes: string;
  icon: string;
}

const ALLERGIES: Allergy[] = [
  { severity: 'Severe', icon: 'fa-light fa-pot-food', type: 'Food', allergen: 'Peanuts', allergenCode: 'A001', notes: 'Carries epipen' },
  { severity: 'Moderate', icon: 'fa-light fa-capsules', type: 'Drug', allergen: 'Penicillin', allergenCode: 'D002', notes: 'Rash and swelling' },
  { severity: 'Mild', icon: 'fa-light fa-tree', type: 'Environmental', allergen: 'Pollen', allergenCode: 'E003', notes: 'Sneezing in spring' },
  { severity: 'Fatal', icon: 'fa-light fa-pot-food', type: 'Food', allergen: 'Shellfish', allergenCode: 'A004', notes: 'Severe reaction' },
  { severity: 'Life-threatening', icon: 'fa-light fa-skull-crossbones', type: 'Other', allergen: 'Latex', allergenCode: 'O005', notes: 'Contact dermatitis' },
];

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.component.html',
  styleUrls: ['./allergies.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonList, IonLabel, IonNote, IonSearchbar]
})
export class AllergiesComponent implements OnInit {
  allergies: Allergy[] = ALLERGIES;
  searchTerm: string = '';

  constructor() { }

  ngOnInit() {}

  get filteredAllergies(): Allergy[] {
    if (!this.searchTerm) return this.allergies;
    const term = this.searchTerm.toLowerCase();
    return this.allergies.filter(a =>
      a.severity.toLowerCase().includes(term) ||
      a.type.toLowerCase().includes(term) ||
      a.allergen.toLowerCase().includes(term) ||
      a.allergenCode.toLowerCase().includes(term) ||
      a.notes.toLowerCase().includes(term)
    );
  }

  getSeverityClass(severity: string): string {
    return 'severity-' + severity.toLowerCase().replace(/ |_/g, '-');
  }

  getTypeDotClass(type: string): string {
    return 'dot-' + type.toLowerCase().replace(/ |_/g, '-');
  }

  onEdit(allergy: Allergy) {
    // Placeholder for edit action
    console.log('Edit allergy:', allergy);
  }

  onDelete(allergy: Allergy) {
    // Placeholder for delete action
    this.allergies = this.allergies.filter(a => a !== allergy);
    console.log('Deleted allergy:', allergy);
  }
}
