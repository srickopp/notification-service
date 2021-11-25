import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merchant } from './entities/merchant.entity';
import { NotificationLog } from './entities/notification-log.entity';
import { Transaction } from './entities/transaction.entity';
import RepoService from './repo.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Merchant, Transaction, NotificationLog])],
  providers: [RepoService],
  exports: [RepoService],
})
export class RepoModule {}
