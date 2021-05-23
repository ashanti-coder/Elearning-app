export class InstructorClass {
    private instructor_id: string;
    private firstname: string;
    private lastname: string;
    private phone: string;
    private gender: string;
    private email: string;
    imgURL: string;

    constructor(){
        this.instructor_id = "xxxxxxxxxxxxxxxxxxx";
        this.firstname = "student_First_name";
        this.lastname = "student_last_name";
        this.phone = "0123456789";
        this.gender = "male";
        this.email = "username@123.co.xc";
        
    }
    overloadStudent(_instructorID: string, _firstname: string, _lastname: string, _phone: string, _gender: string, _email: string,){
        this.instructor_id = _instructorID;
        this.firstname = _firstname;
        this.lastname = _lastname;
        this.phone = _phone;
        this.gender = _gender;
        this.email = _email;
    }
    //Setters -- Set Attributes one by one
    public setInstructor(_instructorID:string){
        this.instructor_id = _instructorID;
    }
    public setFirstName(_firstname:string){
        this.firstname = _firstname;
    }   
    public setlLastName(_lastname:string){
        this.lastname = _lastname;
    }
    public setPhone(_phone:string){
        this.phone = _phone;
    } 
    public setGender(_gender:string){
        this.gender = _gender;
    }   
    public setEmail(_email:string){
        this.email = _email;
    }
//Getters - Get/retrieve/return methods one by one
    public getInstructor(){ 
        return this.instructor_id;
    }
    public getName(){
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