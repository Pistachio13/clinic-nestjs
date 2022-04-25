import { IsNotEmpty, Max, Min } from "class-validator"

export class CreateDoctorDto {
    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    ward: string
}