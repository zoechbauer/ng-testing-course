import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { COURSES, findLessonsForCourse } from '../../../../server/db-data';
import { Course } from '../model/course';
import { HttpErrorResponse } from '@angular/common/http';

describe('CoursesService', () => {
  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    console.log('CoursesService: calling beforeEach');
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    coursesService = TestBed.get(CoursesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve all courses', () => {
    console.log('CoursesService: retrieve all courses test');
    coursesService.findAllCourses().subscribe((courses) => {
      // console.log('courses', courses);
      expect(courses).toBeTruthy('No courses returned');

      expect(courses.length).toBe(12, 'incorrect number of courses');

      const course12 = courses.find((course) => course.id === 12);

      expect(course12.titles.description).toBe(
        'Angular Testing Course',
        'wrong title description'
      );
    });

    const req = httpTestingController.expectOne('/api/courses');

    expect(req.request.method).toEqual('GET');

    req.flush({ payload: Object.values(COURSES) });
  });

  it('should retrieve course by id', () => {
    coursesService.findCourseById(12).subscribe((course) => {
      // console.log('course', course);
      expect(course).toBeTruthy('cannot find course');
      expect(course.id).toBe(12, 'wrong course id');
    });

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual('GET');

    req.flush(COURSES[12]);
  });

  it('should save course data', () => {
    console.log('save course data test');

    const changes: Partial<Course> = {
      titles: { description: 'Angular Course' },
    };

    coursesService.saveCourse(12, changes).subscribe((course) => {
      console.log('updated course', course);
      expect(course.id).toBe(12);
    });

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual('PUT');

    expect(req.request.body.titles.description).toEqual(
      changes.titles.description
    );

    req.flush({
      ...COURSES[12],
      ...changes,
    });
  });

  it('should give an error if save course fails', () => {
    const changes: Partial<Course> = {
      titles: { description: 'Testing Course' },
    };

    coursesService.saveCourse(12, changes).subscribe(
      (course) => {
        // console.log(course);
        fail('the save course operation should have failed');
      },
      (err: HttpErrorResponse) => {
        expect(err.status).toBe(500);
      }
    );

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual('PUT');

    req.flush('Save course failed', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  it('should retrieve lessons of course', () => {
    coursesService.findLessons(12).subscribe((lessons) => {
      console.log('lessons', lessons);
      expect(lessons).toBeTruthy();
      expect(lessons.length).toBe(3, 'wrong number of lessons');
    });

    const req = httpTestingController.expectOne(
      (req) => req.url === '/api/lessons'
    );

    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('courseId')).toBe('12');
    expect(req.request.params.get('filter')).toBe('');
    expect(req.request.params.get('sortOrder')).toBe('asc');
    expect(req.request.params.get('pageNumber')).toBe('0');
    expect(req.request.params.get('pageSize')).toBe('3');

    req.flush({
      payload: findLessonsForCourse(12).slice(0, 3),
    });
  });
});
