import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // dto validtion 적용
  app.useGlobalPipes(new ValidationPipe());
  // 전역에 필터 적용
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('Cat')
    .setVersion('1.0.0')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  // docs => uri
  SwaggerModule.setup('docs', app, document);
  app.enableCors({
    credentials: true,
  });
  await app.listen(process.env.PORT);
}
bootstrap();
