import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';

@Module({
  // 명령어를 통해 module을 생성하면 자동으로 app.module에 추가됨 ex. node g module cats
  imports: [
    CatsModule,

    // envFilePath 지정해주어야함
    ConfigModule.forRoot({}),
    MongooseModule.forRoot(process.env.MONGODB_URI, {}),
  ],
  controllers: [AppController],
  // providers에 등록해야 의존성을 다른 의존성에 주입할 수 있음
  providers: [AppService],
})
export class AppModule implements NestModule {
  // profile 분리를 위한 플래그 변수
  private readonly isDev: boolean = process.env.MODE === 'dev';

  configure(consumer: MiddlewareConsumer) {
    // middleware가 Injectable이 달린 provider이기 때문에 사용할 모듈(미들웨어니까 웬만하면 AppModule이겠지)의 consumer에 등록한다.
    /*
    - forRoute로 미들웨어가 적용될 상위 경로를 지정해줄 수 있음
    - 모든 API에 적용되도록 하기 위해선 와일드카드('*') 사용
     */
    consumer.apply(LoggerMiddleware).forRoutes('cats');
    mongoose.set('debug', this.isDev);
  }
}
