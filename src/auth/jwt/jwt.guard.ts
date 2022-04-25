import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// AuthGuard를 상속받음으로써 strategy를 자동으로 실행함
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
