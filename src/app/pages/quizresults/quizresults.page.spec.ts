import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizresultsPage } from './quizresults.page';

describe('QuizresultsPage', () => {
  let component: QuizresultsPage;
  let fixture: ComponentFixture<QuizresultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizresultsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizresultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
