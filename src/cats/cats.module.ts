import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController], // nest g co cats
  providers: [CatsService], // cats g service cats
  // exports에 등록해줌으로써 다른 모듈에서 주입받아 사용할 수 있음
  exports: [CatsService],
})
export class CatsModule {}
