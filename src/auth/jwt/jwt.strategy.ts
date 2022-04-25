import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 비밀키이기 때문에 환경변수로 관리하는 것이 좋음
      secretOrKey: 'secretKey',
      // 실제 프로젝트에서는 토큰의 유효기간을 정해주어야함 -> 해킹의 위험이 있기 때문
      ignoreExpiration: false,
    });
  }

  async validate(payload) {}
}
