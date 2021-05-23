import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentenrolledcoursePage } from './studentenrolledcourse.page';

describe('StudentenrolledcoursePage', () => {
  let component: StudentenrolledcoursePage;
  let fixture: ComponentFixture<StudentenrolledcoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentenrolledcoursePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentenrolledcoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
