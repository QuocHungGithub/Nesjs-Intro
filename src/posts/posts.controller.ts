import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { GetUsersParamsDto } from 'src/users/dtos/get-users-params.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':userId')
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.finAll(userId);
  }
}
