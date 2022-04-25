import { Connection } from 'typeorm';
import { Patient } from './entities/patient.entity';

export const patientProviders = [
  {
    provide: 'PATIENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Patient),
    inject: ['DATABASE_CONNECTION'],
  },
];