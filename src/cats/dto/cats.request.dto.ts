/**
 * dto를 타입이나 인터페이스로 정의하지 않고 클래스로 정의하는 이유
 * 1. 데코레이터 패턴 사용 가능
 * 2. 상속을 사용하여 재사용성을 높일 수 있음
 */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CatRequestDto {
  @ApiProperty({
    example: 'asdf@cashwalk.io',
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'asdf',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'jih',
    description: 'name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
