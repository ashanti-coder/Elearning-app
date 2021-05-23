import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstructorpanelPage } from './instructorpanel.page';

describe('InstructorpanelPage', () => {
  let component: InstructorpanelPage;
  let fixture: ComponentFixture<InstructorpanelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorpanelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorpanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
