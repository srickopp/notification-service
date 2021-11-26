import { ApiProperty } from '@nestjs/swagger';

export class PartnerCallbackReq {
  @ApiProperty()
  transaction_id: string;
}
