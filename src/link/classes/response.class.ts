import { ApiProperty } from '@nestjs/swagger';

/**
 * ErrorResponse structure
 * @typeParam status - this param with type: `string`. Contains status of request on server side.
 * @typeParam error - this param with type: `string`. Contains error description.
 * @public
 */
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
