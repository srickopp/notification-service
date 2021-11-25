import { Injectable } from '@nestjs/common';
import { TransactionStatus } from 'src/models/entities/transaction.entity';
import RepoService from '../../../models/repo.service';

@Injectable()
export default class NotificationService {
  public constructor(private readonly repoService: RepoService) {}

  async manualNotifcationPayment(transactionId: string) {
    const transaction = await this.repoService.transactionRepo.findOne({
      id: transactionId,
    });

    if (!transaction) {
      return {
        statusCode: 404,
        message: 'TRANSACTION_NOT_FOUND',
      };
    }

    if (transaction.status == TransactionStatus.SUCCESS) {
      return {
        statusCode: 200,
        message: 'TRANSACTION_SUCCESS',
        transaction,
      };
    } else {
      return {
        statusCode: 200,
        message: TransactionStatus.PENDING
          ? 'PENDING_TRANSACTION'
          : 'FAILED_TRANSACTION',
        transaction,
      };
    }
  }
}
