import { Connection } from "typeorm";
import { Doctor } from "./entities/doctor.entity";

export const doctorProviders = [
    {
      provide: 'DOCTOR_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(Doctor),
      inject: ['DATABASE_CONNECTION'],
    },
  ];