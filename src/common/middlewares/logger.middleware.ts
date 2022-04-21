import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    // 응답이 완료되었을 때의 이벤트 등록
    res.on('finish', () => {
      this.logger.log(
        `${req.ip}  ${res.statusCode} ${req.method}`,
        req.originalUrl,
      );
    });
    next();
  }
}
