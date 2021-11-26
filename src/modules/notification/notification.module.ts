import { Module } from '@nestjs/common';
import { RepoModule } from '../../models/repo.module';
import * as dotenv from 'dotenv';
import { NotificationController } from './notification.controller';
import NotificationService from './services/notification.service';
import MerchantService from './services/merchant.service';
import { HttpModule } from '@nestjs/axios';

dotenv.config();

@Module({
  imports: [RepoModule, HttpModule],
  controllers: [NotificationController],
  providers: [NotificationService, MerchantService],
})
export class NotificationModule {}
