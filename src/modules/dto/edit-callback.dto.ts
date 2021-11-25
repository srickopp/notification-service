import { ApiProperty } from '@nestjs/swagger';

export class EditCallback {
  @ApiProperty()
  callback_url: string;
}
