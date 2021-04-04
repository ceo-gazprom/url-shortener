import { IsUrl, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LongLinkDto {
  @ApiProperty()
  @IsString()
  @IsUrl()
  @MinLength(11)
  @MaxLength(255)
  longLink: string;
}
