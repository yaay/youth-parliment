import { Component, ElementRef, ViewChild } from '@angular/core';
import { TuiFileLike } from '@taiga-ui/kit';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StepperStateService } from 'src/app/core/services/stepper-state.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})

export class AttachmentsComponent {
  @ViewChild('personalImgFileInput') fileInput!: ElementRef;
  @ViewChild('idFileInput') idFileInput!: ElementRef;
  @ViewChild('studyProofFileInput') studyProofFileInput!: ElementRef;
  currentInput!: ElementRef;

  constructor(
    private router: Router,
    private stepperStateService: StepperStateService
  ) { }

  attachmentsForm = new FormGroup({
    personalImg: new FormControl(''),
    idFile: new FormControl(''),
    studyProofFile: new FormControl('')
  })

  image!: { name: string, base64: string };
  images: { value: string, name: string, base64: string | ArrayBuffer | null }[] = [];

  openFileInput(elmRef: string) {

    switch (elmRef) {
      case 'personalImgFileInput': this.currentInput = this.fileInput; break;
      case 'idFileInput': this.currentInput = this.idFileInput; break;
      case 'studyProofFileInput': this.currentInput = this.studyProofFileInput; break;
    }
    this.currentInput.nativeElement.click();
  }

  onFileSelected(event: any, value: string) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const imageFile = {
        value: value,
        name: selectedFile.name,
        base64: fileReader.result
      };
      if (!this.hasImage(value)) {
        this.images.push(imageFile);
      } else {
        const index = this.images.findIndex(img => img.value === value);
        this.images[index] = imageFile;
      }
    }
    fileReader.readAsDataURL(selectedFile);
  }



  control = new FormControl();

  file: TuiFileLike = {
    name: 'custom.txt',
  };

  hasImage(value: string) {
    return this.images.find(img => img.value === value);
  }
  returnImage(value: string) {
    const image = this.images.find(img => img.value === value);
    return image?.base64;
  }

  deleteImage(event: Event, value: string) {
    event.stopPropagation();
    const index = this.images.findIndex(img => img.value === value);
    if (index !== -1) {
      this.images.splice(index, 1);
    }
  }

  next() {
    if (this.attachmentsForm.valid) {
      this.stepperStateService.attachmentsState.set('pass')
      this.router.navigate(['voter-data/confirmation'])
    } else {
      this.stepperStateService.attachmentsState.set('fail')
    }
  }

}