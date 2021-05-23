export class Announcement{
    id?: string;

    date: Date;

    message: string;

    category: string;

    viewed?: boolean;

    subject: string;

    constructor( date, subject, message, category, viewed?: boolean, id?: string){

        this.id = id;

        this.date = date.toDate();

        this.subject = subject;

        this.message = message;

        this.viewed = viewed;

        this.category = category;

    }
}