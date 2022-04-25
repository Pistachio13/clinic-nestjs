import { HttpException, HttpStatus } from "@nestjs/common";

export class PatientNotOwnByThisDoctorException extends HttpException {
    constructor() {
      super('Patient not own by this doctor.', HttpStatus.NOT_FOUND);
    }
  }