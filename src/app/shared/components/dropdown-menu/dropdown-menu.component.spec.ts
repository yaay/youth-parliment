import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuComponent } from './dropdown-menu.component';
import { TaigaUIModule } from '../../Taiga UI/taiga-ui.module';

describe('DropdownMenuComponent', () => {
  let component: DropdownMenuComponent;
  let fixture: ComponentFixture<DropdownMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownMenuComponent],
      imports: [TaigaUIModule]
    });
    fixture = TestBed.createComponent(DropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
