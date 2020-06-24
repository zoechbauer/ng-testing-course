import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from '../courses.module';
import { COURSES } from '../../../../server/db-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { sortCoursesBySeqNo } from '../home/sort-course-by-seq';
import { Course } from '../model/course';
import { setupCourses } from '../common/setup-test-data';

describe('CoursesCardListComponent', () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  }));

  it('should create the component', () => {
    // console.log('component', component);
    expect(component).toBeTruthy();
  });

  it('should display the course list', () => {
    component.courses = setupCourses();

    fixture.detectChanges();

    const cards = el.queryAll(By.css('.course-card'));
    // console.log('cards', cards);
    // console.log('debugElement', el.nativeElement.outerHTML);

    expect(cards).toBeTruthy('no cards');
    expect(cards.length).toBe(12, 'wrong number of cards');
  });

  it('should display the first course', () => {
    pending();
  });
});
