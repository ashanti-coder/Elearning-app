import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopularcoursesPage } from './popularcourses.page';

describe('PopularcoursesPage', () => {
  let component: PopularcoursesPage;
  let fixture: ComponentFixture<PopularcoursesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularcoursesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopularcoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
