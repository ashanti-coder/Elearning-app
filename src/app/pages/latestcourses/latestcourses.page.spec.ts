import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LatestcoursesPage } from './latestcourses.page';

describe('LatestcoursesPage', () => {
  let component: LatestcoursesPage;
  let fixture: ComponentFixture<LatestcoursesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestcoursesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LatestcoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
