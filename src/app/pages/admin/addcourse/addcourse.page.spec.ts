import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddcoursePage } from './addcourse.page';

describe('AddcoursePage', () => {
  let component: AddcoursePage;
  let fixture: ComponentFixture<AddcoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcoursePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddcoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
