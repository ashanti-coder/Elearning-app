import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddlessonPage } from './addlesson.page';

describe('AddlessonPage', () => {
  let component: AddlessonPage;
  let fixture: ComponentFixture<AddlessonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlessonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddlessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
