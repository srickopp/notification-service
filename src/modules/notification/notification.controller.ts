import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import MerchantService from './services/merchant.service';
import NotificationService from './services/notification.service';

@Controller('/notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly merchantService: MerchantService,
  ) {}
}
