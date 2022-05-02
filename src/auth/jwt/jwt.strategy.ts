import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { PayLoad } from './jwt.payload';
import { CatsRepository } from '../../cats/cats.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 비밀키이기 때문에 환경변수로 관리하는 것이 좋음
      secretOrKey: process.env.JWT_SECRET,
      // 실제 프로젝트에서는 토큰의 유효기간을 정해주어야함 -> 해킹의 위험이 있기 때문
      ignoreExpiration: false,
    });
  }

  async validate(payload: PayLoad) {
    const cat = await this.catsRespository.findCatByIdWithoutPassword(
      payload.sub,
    );

    if (!cat) {
      throw new UnauthorizedException('접근 오류');
    }

    return cat; // request.user에 cat이 들어가게됨
  }
}
