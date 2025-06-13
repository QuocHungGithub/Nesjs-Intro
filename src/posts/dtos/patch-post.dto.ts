import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostsDto } from './create-posts.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PatchPostDto extends PartialType(CreatePostsDto) {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id: string;
}
