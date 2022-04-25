import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { DatabaseModule } from 'src/database/database.module';
import { doctorProviders } from './doctor.providers';
import { patientProviders } from 'src/patient/patient.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [DoctorController],
  providers: [
    ...doctorProviders,
    ...patientProviders,
    DoctorService
  ]
})
export class DoctorModule {}
