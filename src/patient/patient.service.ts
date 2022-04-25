import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { PatientNotFoundException } from './exception/patient-not-found.exception';

@Injectable()
export class PatientService {
  constructor(
    @Inject('PATIENT_REPOSITORY')
    private patientRepository: Repository<Patient>,
  ){}
  
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = new Patient
    patient.firstName = createPatientDto.firstName
    patient.lastName = createPatientDto.lastName
    patient.age = createPatientDto.age
    patient.diagnosis = createPatientDto.diagnosis
    return await this.patientRepository.save(patient)
  }


  async findAll() {
    return await this.patientRepository.find()
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne(id)
    if (patient == null) {
      throw new PatientNotFoundException()
    }
    return patient
  }

  async update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.patientRepository.findOne(id)
    if (patient == null) {
      throw new PatientNotFoundException()
    }
    patient.firstName = updatePatientDto.firstName
    patient.lastName = updatePatientDto.lastName
    patient.age = updatePatientDto.age
    patient.diagnosis = updatePatientDto.diagnosis
    return await this.patientRepository.save(patient)
  }

  async remove(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne(id)
    if (patient == null) {
      throw new PatientNotFoundException()
    }
    return await this.patientRepository.remove(patient)
  }
}
