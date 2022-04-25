import { HttpException, HttpStatus } from "@nestjs/common";

export class PatientAlreadyOwnByThisDoctorException extends HttpException {
    constructor() {
      super('This Patient already own by this doctor.', HttpStatus.NOT_FOUND);
    }
  }