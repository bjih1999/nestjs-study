import { Module } from '@nestjs/common';
import { CommentsService } from './service/comments.service';
import { CommentsController } from './controller/comments.controller';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
