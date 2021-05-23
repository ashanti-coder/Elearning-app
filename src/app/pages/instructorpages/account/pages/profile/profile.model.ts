export class ProfileModel {
  id:string;
  email:string;
  name: string;
  surname: string;
  gender: string;
  phone: string;
  imageURL: string;
  boi: string;
  address: string;

  constructor(
  _id:string,  _e:string,_fn:string,  _ln:string,
  _g:string,  _ph:string,_img:string,  _boi:string,
  _ad:string){
    this.id = _id;
    this.email = _e;
    this.name = _fn;
    this.surname = _ln;
    this.gender = _g;
    this.phone = _ph;
    this.imageURL = _img;
    this.boi = _boi;
    this.address = _ad;
  }
}
