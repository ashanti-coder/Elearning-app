import { Instructor } from "../../Model/instructor";

export class Account{

    private isSignedIn: boolean = false;

    private instructor: Instructor;


    constructor(isSignedIn: boolean, _instructor: Instructor){
        this.isSignedIn = isSignedIn;

        this.instructor = _instructor;
    }

    public getSignInStatus(): boolean{
        return this.isSignedIn;
    }

    public getInstructor(): Instructor{
        return this.instructor;
    }
    public setSignIn(isSignedIn: boolean){
        this.isSignedIn = isSignedIn;
    }
}