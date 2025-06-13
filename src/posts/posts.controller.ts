import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostsDto } from './dtos/create-posts.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':userId')
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.finAll(userId);
  }
  @ApiOperation({
    summary: 'Tạo bài đăng mới cho blog.',
  })
  @ApiResponse({
    status: 201,
    description:
      'Bạn sẽ nhận được phản hồi thành công 201 nếu bài đăng được tạo thành công',
  })
  @Post()
  public createPost(@Body() createPostsDto: CreatePostsDto) {
    console.log(createPostsDto);
  }

  @ApiOperation({
    summary: 'Cập nhật và bài đăng blog hiện có trong cơ sở dữ liệu.',
  })
  @ApiResponse({
    status: 201,
    description:
      'Bạn nhận được phản hồi thành công 200 nếu bài đăng được cập nhật thành công',
  })
  @Patch()
  public updatePost(@Body() patchPostsDto: PatchPostDto) {
    console.log(patchPostsDto);
  }
}
