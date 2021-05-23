import { ThrowStmt } from "@angular/compiler";

export class Test{
    id: string;
    course_id:string;
    questions = [];

    constructor(id: string, course_id: string, questions){
        this.id = id;

        this.course_id = course_id;

        this.questions = questions;

    }

}