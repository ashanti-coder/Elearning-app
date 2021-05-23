export class Instructor {
    private id: string;
    private name: string;
    private surname: string;
    private phone: string;
    private gender: string;
    private email: string;

    constructor(id: string, firstname: string, lastname: string, phone: string, gender: string, email: string){
        this.id = id;

        this.name = firstname;

        this.surname = lastname;

        this.phone = phone;

        this.gender = gender;

        this.email = email;

    }

    public getId(){
          
        return this.id;
    }

    public geteName(){
        return this.name;
    }

    public getSurname(){
        return this.surname;
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