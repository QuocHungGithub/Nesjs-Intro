import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUsersParamsDto {
  @ApiPropertyOptional({
    description: 'User ID',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
