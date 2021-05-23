import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";


export class Student{

    private studentId: string;

    private firstname: string;

    private lastname: string;

    private phone: string;

    private gender: string;

    private email: string;

    imgURL: string;

    constructor(studentId: string, firstname: string, lastname: string, phone: string, gender: string, email: string, imgURL?: string){
       
        this.studentId = studentId;

        this.firstname = firstname;

        this.lastname = lastname;

        this.phone = phone;

        this.gender = gender;

        this.email = email;

      
        this.imgURL = imgURL;
       

        

    }
    public getStudentNumber(){ 
        return this.studentId;
    }
    public geteName(){
        return this.firstname;
    }
    public getSurname(){
        return this.lastname;
    }
    public getGender(){
        return this.gender;
    }
    public getPhone(){
        return this.phone;
    }
    public getEmail(){
        return this.email;
    }
}