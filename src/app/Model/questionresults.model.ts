export class QuestionResults{

    question: string;

    answer: string;

    marks: number;

    student_answer: string;

    qno: number

    constructor(question: string, answer : string, marks: number, yourAnswer: string, qno: number){
        this.question = question;

        this.answer = answer;
        
        this.marks = marks;

        this.student_answer = yourAnswer;

        this.qno = qno;
    }

    setStudentAswer(student_answer){
        this.student_answer = student_answer;
    }
    
}