
export class Quiz{

    id: string;

    lesson_id:string;

    total_marks: number;

    duration: number;

    questions = [];

    topic: string;

    constructor(id: string, lesson_id: string, total_marks: number, duration: number, questions, topic:string){
        this.id = id;

        this.lesson_id = lesson_id;

        this.total_marks = total_marks;

        this.duration = duration;

        this.questions = questions;

        this.topic = topic;

    }
    

}