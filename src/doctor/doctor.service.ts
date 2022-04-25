import { Inject, Injectable } from '@nestjs/common';
import { Patient } from 'src/patient/entities/patient.entity';
import { PatientNotFoundException } from 'src/patient/exception/patient-not-found.exception';
import { Repository } from 'typeorm';
import { AddPatientDto } from './dto/add-patient.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { DoctorNotFoundException } from './exception/doctor-not-found.exception';
import { PatientAlreadyHasDoctorException } from './exception/patient-already-has-doctor.exception';
import { PatientAlreadyOwnByThisDoctorException } from './exception/patient-already-own-by-this-doctor.exception';
import { PatientNotOwnByThisDoctorException } from './exception/patient-not-own-by-this-doctor.exception';

@Injectable()
export class DoctorService {
  constructor(
    @Inject('DOCTOR_REPOSITORY')
    private doctorRepository: Repository<Doctor>,
    @Inject('PATIENT_REPOSITORY')
    private patientRepository: Repository<Patient>,
  ){}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = new Doctor
    doctor.firstName = createDoctorDto.firstName
    doctor.lastName = createDoctorDto.lastName
    doctor.ward = createDoctorDto.ward
    return await this.doctorRepository.save(doctor)
  }

  async findAll(): Promise<Doctor[]> {
    return await this.doctorRepository.find()
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne(id)
    if (doctor == null) {
      throw new DoctorNotFoundException()
    }
    return doctor
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne(id)
    if (doctor == null) {
      throw new DoctorNotFoundException()
    }
    doctor.firstName = updateDoctorDto.firstName
    doctor.lastName = updateDoctorDto.lastName
    doctor.ward = updateDoctorDto.ward
    return await this.doctorRepository.save(doctor)
  }

  async remove(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne(id)
    if (doctor == null) {
      throw new DoctorNotFoundException()
    }
    return await this.doctorRepository.remove(doctor)
  }

  async addPatient(doctorId: number, addPatientDto: AddPatientDto): Promise<Patient[]> {
    const doctor = await this.doctorRepository.findOne(doctorId)
    if (doctor == null) {
      throw new DoctorNotFoundException()
    }
    
    const patient = await this.patientRepository.findOne(addPatientDto.patientId)
    if (patient == null) {
      throw new PatientNotFoundException()
    }

    if (patient.doctorId != null && patient.doctorId != doctor.id) {
      throw new PatientAlreadyHasDoctorException()
    }

    if (patient.doctorId == doctor.id) {
      throw new PatientAlreadyOwnByThisDoctorException()
    }

    // cat.ownerId = owner.id // ownerId
    patient.doctor = doctor

    await this.patientRepository.save(patient)

    return await this.getPatientList(doctor.id)
  }

  async getPatientList(doctorId: number): Promise<Patient[]> {
    const doctor = await this.doctorRepository.findOne(doctorId)
    if (doctor == null) {
      throw new DoctorNotFoundException()
    }
    return doctor.patients
  }

  async removePatient(doctorId: number, patientId: number): Promise<Patient[]> {
    const doctor = await this.doctorRepository.findOne(doctorId)
    if (doctor == null) {
      throw new DoctorNotFoundException()
    }
    
    const patient = await this.patientRepository.findOne(patientId)
    if (patient == null) {
      throw new PatientNotFoundException()
    }

    if (patient.doctorId != doctor.id) {
      throw new PatientNotOwnByThisDoctorException()
    }

    patient.doctorId = null
    await this.patientRepository.save(patient)

    return await this.getPatientList(doctor.id)
  }
}
