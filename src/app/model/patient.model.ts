import {Treatment} from "./treatment.model";

export class Patient {
  _id: string|null;
  firstName: string;
  lastName: string;
  age: number;
  sex: string;
  drugs: Array<string> = [];
  treatments: Array<Treatment> = [];

  constructor(
    _id: string|null = null,
    firstName: string,
    lastName: string,
    age: number,
    sex: string,
    drugs: Array<string>,
    treatments: Array<Treatment>)
  {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.sex = sex;
    this.drugs = drugs;
    this.treatments = treatments;
  }


}
