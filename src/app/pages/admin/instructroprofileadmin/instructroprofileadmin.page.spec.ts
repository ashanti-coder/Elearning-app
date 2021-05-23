import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstructroprofileadminPage } from './instructroprofileadmin.page';

describe('InstructroprofileadminPage', () => {
  let component: InstructroprofileadminPage;
  let fixture: ComponentFixture<InstructroprofileadminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructroprofileadminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructroprofileadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
