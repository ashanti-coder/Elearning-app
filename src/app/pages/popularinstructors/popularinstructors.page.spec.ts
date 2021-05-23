import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopularinstructorsPage } from './popularinstructors.page';

describe('PopularinstructorsPage', () => {
  let component: PopularinstructorsPage;
  let fixture: ComponentFixture<PopularinstructorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularinstructorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopularinstructorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
