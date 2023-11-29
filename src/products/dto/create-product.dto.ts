import { MaxLength, IsNotEmpty, IsString, IsNumber, IsPositive } from "class-validator"

export class CreateProductDto {

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string

    @IsPositive()
    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    price: number
}
