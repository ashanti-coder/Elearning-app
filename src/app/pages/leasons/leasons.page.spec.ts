import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeasonsPage } from './leasons.page';

describe('LeasonsPage', () => {
  let component: LeasonsPage;
  let fixture: ComponentFixture<LeasonsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasonsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeasonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
