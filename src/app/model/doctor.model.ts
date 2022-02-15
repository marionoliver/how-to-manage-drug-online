
export class Doctor {
  _id: string|null;
  firstName: string|null = null;
  lastName: string|null = null;
  speciality: string|null = null;


  constructor(
    _id: string|null = null,
    firstName: string,
    lastName: string,
    speciality: string)
  {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.speciality = speciality;
  }


}
