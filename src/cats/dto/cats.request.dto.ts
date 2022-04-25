/**
 * dto를 타입이나 인터페이스로 정의하지 않고 클래스로 정의하는 이유
 * 1. 데코레이터 패턴 사용 가능
 * 2. 상속을 사용하여 재사용성을 높일 수 있음
 */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
