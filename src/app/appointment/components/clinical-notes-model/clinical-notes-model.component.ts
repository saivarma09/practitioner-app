import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, IonContent, IonHeader, AlertController, IonModal } from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-clinical-notes-model',
  templateUrl: './clinical-notes-model.component.html',
  styleUrls: ['./clinical-notes-model.component.scss'],
  imports: [CommonModule, IonContent, IonHeader, IonModal]
})
export class ClinicalNotesModelComponent implements OnInit {
  barHeights: number[] = [12, 28, 48, 56, 60, 56, 48, 36, 24, 16, 12, 16, 24, 36, 48, 56, 60, 56, 48, 28, 12];
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  imagePreviews: { src: string, name: string }[] = [];
  selectedPreview: string | null = null;
  showImageModal = false;

  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.shuffleBars();
  }

  shuffleBars() {
    // Fisher-Yates shuffle
    for (let i = this.barHeights.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.barHeights[i], this.barHeights[j]] = [this.barHeights[j], this.barHeights[i]];
    }
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push({
            src: e.target.result,
            name: file.name
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  async openCamera() {
    try {
      const permStatus = await Camera.requestPermissions({ permissions: ['camera'] });
      if (permStatus.camera !== 'granted') {
        alert('Camera permission is required to take a picture.');
        return;
      }
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      if (image.dataUrl) {
        this.imagePreviews.push({
          src: image.dataUrl,
          name: 'Camera Image'
        });
      }
    } catch (err) {
      console.error('Camera error:', err);
    }
  }

  openImagePreview(image: string) {
    this.selectedPreview = image;
    this.showImageModal = true;
  }

  closeImagePreview() {
    this.showImageModal = false;
    this.selectedPreview = null;
  }

  async presentImageOptionAlert() {
    const alert = await this.alertController.create({
      header: 'Add Image',
      cssClass: 'font-manrope fs-16 fw-500 primary-color',
      buttons: [
        {
          text: 'Upload',
          cssClass: 'font-manrope fs-16 fw-500 primary-color',
          handler: () => {
            this.triggerFileInput();
          }
        },
        {
          text: 'Camera',
          cssClass: 'font-manrope fs-16 fw-500 primary-color',
          handler: () => {
            this.openCamera();
          }
        },
        {
          text: 'Cancel',
          cssClass: 'font-manrope fs-16 fw-500 primary-color',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  deleteImage(index: number) {
    this.imagePreviews.splice(index, 1);
  }
}
