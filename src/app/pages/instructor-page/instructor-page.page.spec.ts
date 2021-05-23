import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstructorPagePage } from './instructor-page.page';

describe('InstructorPagePage', () => {
  let component: InstructorPagePage;
  let fixture: ComponentFixture<InstructorPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
