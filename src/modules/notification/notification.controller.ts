import { Body, Controller, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { EditCallback } from '../dto/edit-callback.dto';
import { GenerateKey } from '../dto/generate-key.dto';
import { ManualRetry } from '../dto/manual-retry.dto';
import { PartnerCallbackReq } from '../dto/partner-callback.dto';
import MerchantService from './services/merchant.service';
import NotificationService from './services/notification.service';

@Controller('/notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly merchantService: MerchantService,
  ) {}

  @ApiTags('Notification Service')
  @Post('/callback')
  async partnerCallback(
    @Body() body: PartnerCallbackReq,
    @Res() res: Response,
  ) {
    const partnerCallback = await this.notificationService.partnerCallback(
      body,
    );
    return res.status(partnerCallback.statusCode).send({
      message: partnerCallback.message,
    });
  }

  @ApiTags('Notification Service')
  @Post('/transaction/retry')
  async manualNotifcationPayment(
    @Body() body: ManualRetry,
    @Res() res: Response,
  ) {
    const manualNotif = await this.notificationService.manualNotifcationPayment(
      body.transaction_id,
    );

    return res.status(manualNotif.statusCode).send({
      message: manualNotif.message,
      data: manualNotif.data,
    });
  }

  @ApiTags('Merchant')
  @Post('/merchant/generate-key')
  async generateMerchantKey(@Body() body: GenerateKey, @Res() res: Response) {
    const generateKey = await this.merchantService.generateMerchantToken(
      body.merchant_id,
    );

    return res.status(generateKey.statusCode).send({
      message: generateKey.message,
      data: generateKey.data,
    });
  }

  @ApiTags('Merchant')
  @Put('/merchant/:id/callback')
  async editMerchantCallback(
    @Param('id') id: string,
    @Body() body: EditCallback,
    @Res() res: Response,
  ) {
    const updateCallbackUrl =
      await this.merchantService.updateMerchantCallbackUrl(
        id,
        body.callback_url,
      );

    return res.status(updateCallbackUrl.statusCode).send({
      message: updateCallbackUrl.message,
      data: updateCallbackUrl.data,
    });
  }
}
