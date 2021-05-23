export class QuizHistory{

    id:string;

    marks: number;

    date: Date;

    pdf: string;

    constructor(id: string, date,  marks: number, pdf){
        this.id = id;

        this.marks = marks;
        
        this.date = date.toDate();

        this.pdf = pdf;
    }
}