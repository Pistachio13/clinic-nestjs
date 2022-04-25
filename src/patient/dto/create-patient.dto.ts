import { IsNotEmpty, Max, Min } from "class-validator"

export class CreatePatientDto {
    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    @Min(1)
    @Max(100)
    age: number

    @IsNotEmpty()
    diagnosis: string
}
