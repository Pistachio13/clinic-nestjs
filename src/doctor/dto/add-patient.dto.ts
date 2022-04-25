import { IsNotEmpty } from "class-validator"

export class AddPatientDto {
    @IsNotEmpty()
    patientId: number
}
