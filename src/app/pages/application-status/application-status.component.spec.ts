import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationStatusComponent } from './application-status.component';
import { TaigaUIModule } from 'src/app/shared/Taiga UI/taiga-ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApplicationStatusComponent', () => {
  let component: ApplicationStatusComponent;
  let fixture: ComponentFixture<ApplicationStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationStatusComponent],
      imports: [HttpClientTestingModule, TaigaUIModule]
    });
    fixture = TestBed.createComponent(ApplicationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
