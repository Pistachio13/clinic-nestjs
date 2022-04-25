import { HttpException, HttpStatus } from "@nestjs/common";

export class DoctorNotFoundException extends HttpException {
    constructor() {
      super('DOctor not found.', HttpStatus.NOT_FOUND);
    }
  }