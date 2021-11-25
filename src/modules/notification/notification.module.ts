import { Module } from '@nestjs/common';
import { RepoModule } from 'src/models/repo.module';
import * as dotenv from 'dotenv';
import { NotificationController } from './notification.controller';
import NotificationService from './services/notification.service';
import MerchantService from './services/merchant.service';

dotenv.config();

@Module({
  imports: [RepoModule],
  controllers: [NotificationController],
  providers: [NotificationService, MerchantService],
})
export class OrganizationModule {}
