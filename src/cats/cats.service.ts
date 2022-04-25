import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signup(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    /**
     * 현재는 서비스 로직 내에서 DB에 접근하는 형태
     * 단점)
     *  DB 로직이 복잡해질 경우 비즈니스 로직도 같이 복잡해짐
     *    -> 테스트가 어려워지고, 중복이 많아지며, 가독성이 떨어짐
     *    => 레포지토리 패턴을 도입을 하는것이 바람직
     *
     * 데이터베이스 접근 로직이 서비스 레이어에 있는 경우, 이 로직을 다른 서비스에서 사용하기 위해선 다른 서비스에서 서비스를 참조해야함
     * 하지만, 이렇게되면 서로 참조하는 관계가 될 가능성이 있어 순환참조가 발생함, 물론 해결할 수는 있음 그러나 가독성이 떨어짐
     *
     * 이 때, 레포지토리 패턴을 도입하여, 디비 접근 로직을 레포지토리에 포함시킨다면, 디비 접근로직을 서비스에서 참조를 할때, 다른 서비스가 아니라 레포지토리를 참조하게 되면서
     * 순환 참조문제를 해결할 수 있으며, 가독성이 좋아지며, 모듈간의 책임분리도 확실해 진다.
     *
     * 또한, 여러개의 데이터소스를 사용할 경우 서비스에서는 데이터 출처와 관계없이 로직을 사용할 수 있게 됨
     */
    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
