import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AttachmentsComponent } from './attachments.component';
import { TaigaUIModule } from 'src/app/shared/Taiga UI/taiga-ui.module';

describe('AttachmentsComponent', () => {
  let component: AttachmentsComponent;
  let fixture: ComponentFixture<AttachmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttachmentsComponent],
      providers: [FormBuilder],
      imports: [ReactiveFormsModule, TaigaUIModule]
    });
    fixture = TestBed.createComponent(AttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
