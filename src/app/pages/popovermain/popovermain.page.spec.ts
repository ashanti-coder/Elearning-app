import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopovermainPage } from './popovermain.page';

describe('PopovermainPage', () => {
  let component: PopovermainPage;
  let fixture: ComponentFixture<PopovermainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopovermainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopovermainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
