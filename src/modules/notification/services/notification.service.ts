import { Injectable } from '@nestjs/common';
import {
  Transaction,
  TransactionStatus,
} from '../../../models/entities/transaction.entity';
import { MerchantNotificationReq } from 'src/modules/dto/merchant-request.dto';
import { PartnerCallbackReq } from 'src/modules/dto/partner-callback.dto';
import RepoService from '../../../models/repo.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export default class NotificationService {
  public constructor(
    private readonly repoService: RepoService,
    private readonly httpService: HttpService,
  ) {}

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
        data: transaction,
      };
    } else {
      return {
        statusCode: 200,
        message: TransactionStatus.PENDING
          ? 'PENDING_TRANSACTION'
          : 'FAILED_TRANSACTION',
        data: transaction,
      };
    }
  }

  async partnerCallback(data: PartnerCallbackReq) {
    const transaction = await this.repoService.transactionRepo.findOne({
      where: {
        id: data.transaction_id,
      },
      relations: ['merchant'],
    });

    if (!transaction) {
      return {
        statusCode: 404,
        message: 'TRANSACTION_NOT_FOUND',
      };
    }

    if (transaction.status != TransactionStatus.SUCCESS) {
      const timestamp = new Date();
      await this.repoService.transactionRepo.update(
        {
          id: data.transaction_id,
        },
        {
          status: TransactionStatus.SUCCESS,
          updated_at: timestamp,
        },
      );
      this.merchantNotification(transaction, timestamp);
    }

    return {
      statusCode: 200,
      message: 'TRANSACTION_SUCCESS',
    };
  }

  private async merchantNotification(
    transaction: Transaction,
    timestamp: Date,
  ) {
    // Merchant Request payload format
    const payload: MerchantNotificationReq = {
      id: transaction.id,
      business_id: transaction.merchant.id,
      partner_trx_id: transaction.partner_trx_id,
      amount: transaction.amount,
      transaction_timestamp: timestamp,
    };

    const merchantUrl = transaction.merchant.callback_url;
    const merchantKey = transaction.merchant.api_key;

    await this.httpService
      .post(merchantUrl, payload, {
        headers: {
          Authorization: 'Bearer ' + merchantKey,
        },
      })
      .toPromise()
      .then(async (data) => {
        console.log(data);
        await this.repoService.notificationLogRepo.save({
          transaction_id: transaction.id,
          status: true,
        });
      })
      .catch(async (err) => {
        console.log(
          `Failed post to merchant, Merchant ID:${transaction.merchant_id}, Transaction ID: ${transaction.id}`,
        );
        await this.repoService.notificationLogRepo.save({
          transaction_id: transaction.id,
          status: false,
          error_message: JSON.stringify(err.message ?? err.response),
        });
        // Retry
        setTimeout(
          () => this.merchantNotification(transaction, timestamp),
          10000,
        );
      });
  }
}
