import { Course } from "./course";
import { Lesson } from "./lesson.mode";

export class EnrolledCourse{

    private course: Course;

    constructor(course: Course){

        this.course = course;
    }


    public getCourse(): Course{
        return this.course;
    }
}