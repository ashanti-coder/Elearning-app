import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizmarksPage } from './quizmarks.page';

describe('QuizmarksPage', () => {
  let component: QuizmarksPage;
  let fixture: ComponentFixture<QuizmarksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizmarksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizmarksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
