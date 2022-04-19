import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

@Module({
  // 명령어를 통해 module을 생성하면 자동으로 app.module에 추가됨 ex. node g module cats
  imports: [CatsModule],
  controllers: [AppController],
  // providers에 등록해야 의존성을 다른 의존성에 주입할 수 있음
  providers: [AppService],
})
export class AppModule {}
