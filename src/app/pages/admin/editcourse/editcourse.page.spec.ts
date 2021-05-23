import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditcoursePage } from './editcourse.page';

describe('EditcoursePage', () => {
  let component: EditcoursePage;
  let fixture: ComponentFixture<EditcoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcoursePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditcoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
