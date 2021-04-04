import { ApiProperty } from '@nestjs/swagger';
export class ErrorResponse {
  @ApiProperty({
    type: String,
    description: 'Status on server.',
    required: false,
  })
  status: string;

  @ApiProperty({
    type: String,
    description: 'Error description.',
    required: false,
  })
  error: string;
}
