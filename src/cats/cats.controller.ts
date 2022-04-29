import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseFilters, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { PositiveIntPipe } from '../common/pipes/positiveInt.pipe';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "../auth/jwt/jwt.guard";

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: '현재 고양이 가져오기',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat() {
    return 'cuurent cat';
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
  @ApiResponse({
    status: 201,
    description: '성공!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({
    summary: '회원가입',
  })
  @Post()
  async signup(@Body() body: CatRequestDto) {
    console.log(body);
    return this.catsService.signup(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogIn(body);
  }

  // @Get()
  // @UseFilters(HttpExceptionFilter) // 필터를 적용할 대상위에 달아주면 예외 처리 필터가 적용됨
  // @UseInterceptors(SuccessInterceptor) // 인터셉터를 적용할 대상위에 달아주면 인터셉터가 적용
  // getAllCat() {
  //   /*
  //   - 단순 Error로 통일된 express와 달리 nes됨에는 HttpExeption이 존재함
  //   - HttpException이기 때문에 네트워크 레이어와 근접한 Controller 단에서 발생시키는 것이 바람직해 보인다.
  //  인ㅌ */
  //   throw new HttpException(
  //     '인증되지 않은 회원입니다.',
  //     HttpStatus.UNAUTHORIZED,
  //   );
  //   return 'all cat';
  // }
  //
  // /*
  // 파라미터의 값에 대해 pipe를 추가하여 값을 필터링
  //  */
  // @Get(':id')
  // getOnceCate(@Param('id', PositiveIntPipe) id: number) {
  //   return 'one cat';
  // }
  //
  // @Post()
  // createCat() {
  //   return 'create cat';
  // }
  //
  // @Put(':id')
  // updateCat() {
  //   return 'update cat';
  // }
  //
  // @Patch(':id')
  // updatePartialCat() {
  //   return 'update';
  // }
  //
  // @Delete(':id')
  // deleteCat() {
  //   return 'delete service';
  // }
}
