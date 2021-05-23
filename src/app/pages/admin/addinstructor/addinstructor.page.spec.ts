import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddinstructorPage } from './addinstructor.page';

describe('AddinstructorPage', () => {
  let component: AddinstructorPage;
  let fixture: ComponentFixture<AddinstructorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddinstructorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddinstructorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
