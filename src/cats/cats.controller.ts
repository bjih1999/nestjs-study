import { Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Put, UseFilters } from "@nestjs/common";
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from "../http-exception.filter";

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)  // 필터를 적용할 대상위에 달아주면 예외 처리 필터가 적용됨
  getAllCat() {
    /*
    - 단순 Error로 통일된 express와 달리 nest에는 HttpExeption이 존재함
    - HttpException이기 때문에 네트워크 레이어와 근접한 Controller 단에서 발생시키는 것이 바람직해 보인다.
     */
    throw new HttpException(
      '인증되지 않은 회원입니다.',
      HttpStatus.UNAUTHORIZED,
    );
    return 'all cat';
  }

  @Get(':id')
  getOnceCate() {
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
