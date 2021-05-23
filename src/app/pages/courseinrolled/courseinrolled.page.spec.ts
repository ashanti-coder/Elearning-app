import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CourseinrolledPage } from './courseinrolled.page';

describe('CourseinrolledPage', () => {
  let component: CourseinrolledPage;
  let fixture: ComponentFixture<CourseinrolledPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseinrolledPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseinrolledPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
