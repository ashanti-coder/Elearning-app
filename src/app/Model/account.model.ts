import { Student } from "./student.model";

export class Account{

    private isSignedIn: boolean = false;

    private student: Student;


    constructor(isSignedIn: boolean, student: Student){
        this.isSignedIn = isSignedIn;

        this.student = student;
    }

    public getSignInStatus(): boolean{
        return this.isSignedIn;
    }

    public getStudent(): Student{
        return this.student;
    }
    public setSignIn(isSignedIn: boolean){
        this.isSignedIn = isSignedIn;
    }
}