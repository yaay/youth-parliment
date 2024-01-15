import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDataComponent } from './contact-data.component';
import { TaigaUIModule } from 'src/app/shared/Taiga UI/taiga-ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('ContactDataComponent', () => {
  let component: ContactDataComponent;
  let fixture: ComponentFixture<ContactDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactDataComponent],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule, TaigaUIModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(ContactDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
