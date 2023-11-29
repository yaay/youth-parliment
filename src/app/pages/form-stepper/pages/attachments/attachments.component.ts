import { Component, ElementRef, ViewChild } from '@angular/core';
import { TuiFileLike } from '@taiga-ui/kit';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})

export class AttachmentsComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  image: any = null

  openFileInput() {
    console.log('opening file input');
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const imageFile = {
        name: selectedFile.name,
        base64: fileReader.result
      };
      this.image = imageFile;
      console.log(imageFile);
    }
    fileReader.readAsDataURL(selectedFile);
  }

  

  control = new FormControl();

  file: TuiFileLike = {
    name: 'custom.txt',
  };

  onFileChange(event: any) {
    console.log(event)
  }

  next() {
    console.log(this.control)
  }

}