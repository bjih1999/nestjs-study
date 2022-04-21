import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseFilters, UseInterceptors
} from "@nestjs/common";
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from "../common/exceptions/http-exception.filter";
import { PositiveIntPipe } from "../common/pipes/positiveInt.pipe";
import { SuccessInterceptor } from "../common/interceptors/success.interceptor";

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter) // 필터를 적용할 대상위에 달아주면 예외 처리 필터가 적용됨
  @UseInterceptors(SuccessInterceptor) // 인터셉터를 적용할 대상위에 달아주면 인터셉터가 적용됨
  getAllCat() {
    /*
    - 단순 Error로 통일된 express와 달리 nest에는 HttpExeption이 존재함
    - HttpException이기 때문에 네트워크 레이어와 근접한 Controller 단에서 발생시키는 것이 바람직해 보인다.
   인ㅌ */
    throw new HttpException(
      '인증되지 않은 회원입니다.',
      HttpStatus.UNAUTHORIZED,
    );
    return 'all cat';
  }

  /*
  파라미터의 값에 대해 pipe를 추가하여 값을 필터링
   */
  @Get(':id')
  getOnceCate(@Param('id', PositiveIntPipe) id: number) {
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete service';
  }
}
