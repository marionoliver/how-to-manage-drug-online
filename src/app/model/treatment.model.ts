
export class Treatment {
  _id: string|undefined;
  start: Date;
  end: Date;
  text: string;
  doctor: string;


  constructor(
  start: Date,
  end: Date,
  text: string,
  doctor: string)
  {
    this.start = start;
    this.end = end;
    this.text = text;
    this.doctor = doctor;
  }

}
