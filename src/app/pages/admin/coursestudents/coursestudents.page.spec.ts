import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoursestudentsPage } from './coursestudents.page';

describe('CoursestudentsPage', () => {
  let component: CoursestudentsPage;
  let fixture: ComponentFixture<CoursestudentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursestudentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursestudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
