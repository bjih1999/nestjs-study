import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from '../cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    //해당하는 email이 있는지
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    // password가 일치한지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메이로가 비밀번호를 확인해주세요.');
    }

    const payload = { email, sub: cat.id };

    // 토큰을 서명해서 리턴
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
