import { ApiProperty } from '@nestjs/swagger';

export class ManualRetry {
  @ApiProperty()
  merchant_id: string;

  @ApiProperty()
  transaction_id: string;
}
