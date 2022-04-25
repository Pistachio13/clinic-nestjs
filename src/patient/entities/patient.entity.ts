import { Doctor } from "src/doctor/entities/doctor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ length: 500 })
  diagnosis: string;

  @Column('int', { nullable: true })
  doctorId: number

  @ManyToOne(() => Doctor, doctor => doctor.patients)
  @JoinColumn()
  doctor: Doctor;
}