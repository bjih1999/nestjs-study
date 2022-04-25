import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class ReadOnlyCatDto {
    @ApiProperty({
        example: 'asdf',
    description: 'id',
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    id: string;

    @ApiProperty({
        example: 'asdf@cashwalk.io',
        description: 'email',
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;


    @ApiProperty({
        example: 'jih',
        description: 'name',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}