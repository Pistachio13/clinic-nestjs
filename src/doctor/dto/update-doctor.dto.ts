import { IsNotEmpty, Max, Min } from "class-validator"

export class UpdateDoctorDto {
    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    ward: string
}