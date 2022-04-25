import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { DatabaseModule } from 'src/database/database.module';
import { patientProviders } from './patient.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PatientController],
  providers: [
    ...patientProviders,
    PatientService
  ]
})
export class PatientModule {}
