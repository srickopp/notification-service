import { ApiProperty } from '@nestjs/swagger';

export class MerchantNotificationReq {
  @ApiProperty()
  id: string;

  @ApiProperty()
  business_id: string;

  @ApiProperty()
  partner_trx_id: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  transaction_timestamp: Date;
}
