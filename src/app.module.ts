import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  // 명령어를 통해 module을 생성하면 자동으로 app.module에 추가됨 ex. node g module cats
  imports: [CatsModule],
  controllers: [AppController],
  // providers에 등록해야 의존성을 다른 의존성에 주입할 수 있음
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    // middleware가 Injectable이 달린 provider이기 때문에 사용할 모듈(미들웨어니까 웬만하면 AppModule이겠지)의 consumer에 등록한다.
    /*
    - forRoute로 미들웨어가 적용될 상위 경로를 지정해줄 수 있음
    - 모든 API에 적용되도록 하기 위해선 와일드카드('*') 사용
     */
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
