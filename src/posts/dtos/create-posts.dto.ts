import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator'; // dùng để xác thực dữ liệu
import { PostStatus } from '../enums/post-status.enums';
import { PostType } from '../enums/post-type.enum';
import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto';
import { Type } from 'class-transformer'; // dùng để chuyển đổi dữ liệu lồng nhau
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostsDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @IsEnum(PostType) // phải là 1 giá trị nằm trong Enum PostType
  @IsNotEmpty()
  @ApiProperty({
    enum: PostType,
    description: "Possible values  'post', 'page', 'story', 'series'",
    example: PostType.POST,
  })
  postType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "For example 'my-url'",
  })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Một slug phải toàn là chữ thường và chỉ sử dụng "-" và không có khoảng trắng. Ví dụ "my-url"',
  })
  slug: string;

  @IsEnum(PostStatus)
  @IsNotEmpty()
  @ApiProperty({
    enum: PostStatus,
    description: "Possible values 'draft', 'scheduled', 'review', 'published'",
  })
  status: PostStatus;

  @IsOptional() // không bắt buộc - nếu có phải là chuỗi
  @IsString()
  content?: string;

  @IsOptional() // không bắt buộc - nếu có phải là chuỗi JSON
  @IsJSON()
  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be thrown',
  })
  schema?: string;

  @IsOptional() // không bắt buộc - nếu có phải là URL hợp lệ
  @IsUrl()
  featuredImageUrl?: string;

  @IsISO8601()
  @ApiPropertyOptional()
  @IsOptional() // không bắt buộc - nếu có phải là chuỗi ISO 8601
  @ApiProperty({
    description: 'Must be a valid timestamp in ISO8601',
    example: '2024-03-16T07:46:32+0000',
  })
  publishon?: Date;

  @IsArray()
  @ApiPropertyOptional()
  @IsString({ each: true })
  @IsOptional()
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
        },
        value: {
          type: 'string',
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions: CreatePostMetaOptionsDto[];
}
