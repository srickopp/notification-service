import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from './entities/merchant.entity';
import { NotificationLog } from './entities/notification-log.entity';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export default class RepoService {
  /**
   * All Models are injected here
   * You can create a new Injected model here
   */
  public constructor(
    @InjectRepository(Merchant)
    public readonly merchantRepo: Repository<Merchant>,
    @InjectRepository(Transaction)
    public readonly transactionRepo: Repository<Transaction>,
    @InjectRepository(NotificationLog)
    public readonly notificationLogRepo: Repository<NotificationLog>,
  ) {}
}
