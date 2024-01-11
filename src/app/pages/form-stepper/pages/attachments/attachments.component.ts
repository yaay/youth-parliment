import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { StepperStateService } from 'src/app/core/services/stepper-state.service';
import { RequestService } from 'src/app/core/services/request.service';
import { AttachmentRepository } from 'src/app/domain/attachment/attachment.repository';

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
  attachmentId!:number;
  attachment!:{};
  personalId!:number;
  nationalFileId!:number;
  studyId!:number;
  requestId!: number;
  images: { value: string, name: string, base64: string | ArrayBuffer | null }[] = [];
  attachmentsForm!:FormGroup;
  constructor(
    private router: Router,
    private stepperStateService: StepperStateService,
    private requestService: RequestService,
    private attachmentRepository:AttachmentRepository
      ) { }

  initializeAttachmentForm(){
    this.attachmentsForm = new FormGroup({
    personalImg: new FormControl(''),
    idFile: new FormControl(''),
    studyProofFile: new FormControl('')
  })
      }
  ngOnInit() {
    this.initializeAttachmentForm();
    this.getRequestId();
    this.patchImages();
  }

  getRequestId() {
    this.requestId = this.requestService.requestId();
  }

  openFileInput(elmRef: string) {
    switch (elmRef) {
      case 'personalImgFileInput': this.currentInput = this.fileInput; break;
      case 'idFileInput': this.currentInput = this.idFileInput; break;
      case 'studyProofFileInput': this.currentInput = this.studyProofFileInput; break;
    }
    this.currentInput.nativeElement.click();
  }
  setAttachment(image:any ,requestId:number){
    this.attachment = {
      content:image.base64.replace(/^[^,]+, */, ''),
      request:{
        id:this.requestId
      },
      requestAttachmentType:{
        id:requestId
      }
    }
  }

  onFileSelected(event: any, value: string) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const imageFile = {
        value: value,
        name: selectedFile.name,
        base64: fileReader.result as string
      };
      if (!this.hasImage(value)) {
        this.images.push(imageFile);
      if( imageFile.value == "personalImg"){
        this.setAttachment(imageFile,1);
          this.attachmentRepository.addAttachment(this.requestId,this.attachment).subscribe(res=>{
            this.personalId=res.id;
          });
        }
        else if(imageFile.value == "idCardImg"){
          this.setAttachment(imageFile,2);
            this.attachmentRepository.addAttachment(this.requestId,this.attachment).subscribe(res=>{
            this.nationalFileId=res.id;
            });
            }

        else if(imageFile.value == "studyProofImg"){
          this.setAttachment(imageFile,4);
            this.attachmentRepository.addAttachment(this.requestId,this.attachment).subscribe(res=>{
              this.studyId=res.id;
            });
        }

      } else {
          const index = this.images.findIndex(img => img.value === value);
          this.images[index] = imageFile;
      }
    }
    fileReader.readAsDataURL(selectedFile);
  }

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
      if(value=="personalImg"){
        this.attachmentRepository.delete(this.personalId).subscribe();
      }
      else if(value=="idCardImg"){
        this.attachmentRepository.delete(this.nationalFileId).subscribe();
      }
      else if (value == "studyProofImg"){
        this.attachmentRepository.delete(this.studyId).subscribe();
      }
    }
  }
  back() {
    this.router.navigate(['voter-data/edu-qualifications'], { skipLocationChange: true })
  }

  next() {
    if (this.attachmentsForm.valid) {
      this.stepperStateService.attachmentsState.set('pass')
      this.router.navigate(['voter-data/confirmation'], { skipLocationChange: true })
    } else {
      this.stepperStateService.attachmentsState.set('fail')
    }
  }
  setImages(image:any,value:string){
    this.images.push({
      base64:image,
      name:"",
      value:value
    })
  }
  patchImages(){
    this.attachmentRepository.getAttachment(this.requestId).subscribe(res=>{
      let data = "data:image/jpeg;base64,";
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          if(element.requestAttachmentType.code=="PersonalPhoto"){
            this.personalId=element.id;
            let image = data + element.content;
            this.setImages(image,"personalImg");
          }
          else if(element.requestAttachmentType.code=="IdentityCard"){
            this.nationalFileId=element.id;
            let image = data + element.content;
            this.setImages(image,"idCardImg");
          }
          else if(element.requestAttachmentType.code=="AcademicCard"){
            this.studyId=element.id;
            let image = data + element.content;
            this.setImages(image,"studyProofImg");
          }
        }
    })
  }
}
