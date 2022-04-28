import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { AddPatientDto } from './dto/add-patient.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }

  @Post(':id/patients')
  addPatient(@Param('id') id: string, @Body() addPatientDto: AddPatientDto) {
    return this.doctorService.addPatient(+id, addPatientDto)
  }

  @Get(':id/patients')
  getPatientList(@Param('id') id: string) {
    return this.doctorService.getPatientList(+id)
  }

  @Delete(':id/patients/:patientId') 
  removePatient(
    @Param('id') id: string,
    @Param('patientId') patientId: string,
  ) {
    return this.doctorService.removePatient(+id, +patientId)
  }
}
