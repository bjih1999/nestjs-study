import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Cat, CatSchema} from "./cats.schema";
import { CatsRepository } from "./cats.repository";

@Module({
  // 해당 스키마를 등록해서 사용할 수 있도록 함
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatsController], // nest g co cats
  providers: [CatsService, CatsRepository], // cats g service cats
  /*
  exports에 등록해줌으로써 다른 모듈에서 주입받아 사용할 수 있음
  기본적으로 nest 모듈은 하위 의존성을 캡슐화하기 때문에, 사용하고자하는 module에 의존성을 provider로 등록해야 해당 모듈에서 사용할 수 있음
  But, 이렇게 하면 단일 책임 원칙을 위반하게된다(고 한다. 사실 왜인지는 모르겠다. 이미 각 의존성이 각자의 역할을 가지고 있는데 크게 문제 없지 않나 싶다)
    -> 상위 모듈에서 하위 의존성을 exports하고 해당 모듈을 다른 모듈에서 import 함으로써, provider에 일일이 등록하는 수고를 덜 수 있다.
    -> 이렇게 하면 모듈의 제작자가 의도한 대로 모듈을 사용할 수 있게 되는 장점이 있을것 같다. (이런 점 때문에 단일 책임 원칙을 준수할 수 있는건가?)*/
  exports: [CatsService],
})
export class CatsModule {}
