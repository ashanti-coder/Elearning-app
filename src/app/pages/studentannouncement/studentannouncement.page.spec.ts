import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentannouncementPage } from './studentannouncement.page';

describe('StudentannouncementPage', () => {
  let component: StudentannouncementPage;
  let fixture: ComponentFixture<StudentannouncementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentannouncementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentannouncementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
