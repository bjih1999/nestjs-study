import { Injectable } from '@nestjs/common';
import { CommentsCreateDto } from "../dto/comments.create.dto";

@Injectable()
export class CommentsService {
  createComment(id: string, comments: CommentsCreateDto) {
    return Promise.resolve(undefined);
  }

  plusLike(id: string) {
    return Promise.resolve(undefined);
  }
}
