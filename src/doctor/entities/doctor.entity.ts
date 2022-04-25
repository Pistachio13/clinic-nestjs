import { Patient } from "src/patient/entities/patient.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ length: 500 })
  ward: string;

  @OneToMany(() => Patient, (patient) => patient.doctor, {lazy: true})
  patients: Patient[];
}