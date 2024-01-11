import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDataComponent } from './main-data.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaigaUIModule } from 'src/app/shared/Taiga UI/taiga-ui.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MainDataComponent', () => {
  let component: MainDataComponent;
  let fixture: ComponentFixture<MainDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainDataComponent],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule, TaigaUIModule, ReactiveFormsModule, NoopAnimationsModule]
    });
    fixture = TestBed.createComponent(MainDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
