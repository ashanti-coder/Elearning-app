import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizhistoryPage } from './quizhistory.page';

describe('QuizhistoryPage', () => {
  let component: QuizhistoryPage;
  let fixture: ComponentFixture<QuizhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizhistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
