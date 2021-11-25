import { ApiProperty } from '@nestjs/swagger';

export class GenerateKey {
  @ApiProperty()
  merchant_id: string;
}
