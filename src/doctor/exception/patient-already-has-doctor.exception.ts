import { HttpException, HttpStatus } from "@nestjs/common";

export class PatientAlreadyHasDoctorException extends HttpException {
    constructor() {
      super('This Patient already has doctor.', HttpStatus.NOT_FOUND);
    }
  }