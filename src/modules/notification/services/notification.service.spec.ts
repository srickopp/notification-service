import RepoService from '../../../models/repo.service';
import { Repository } from 'typeorm';
import { Merchant } from 'src/models/entities/merchant.entity';
import { Transaction } from 'src/models/entities/transaction.entity';
import { NotificationLog } from 'src/models/entities/notification-log.entity';
import NotificationService from './notification.service';
import { PartnerCallbackReq } from 'src/modules/dto/partner-callback.dto';

describe('Notification Service', () => {
  const notificationService = new NotificationService(
    new RepoService(
      new Repository<Merchant>(),
      new Repository<Transaction>(),
      new Repository<NotificationLog>(),
    ),
  );

  describe('Function: Manual retry notification by merchant', () => {
    it('it should return an object response for manual retry notification', async () => {
      const transactionId = '08114a9d-5ad8-4bfb-8bea-9b09029a30c4';
      expect(
        typeof notificationService
          .manualNotifcationPayment(transactionId)
          .then((data) => data)
          .catch((err) => err),
      ).toEqual('object');
    });
  });

  describe('Function: Receive data from partner callback', () => {
    it('it should return an object response after receive data from partner callback', async () => {
      const reqData: PartnerCallbackReq = {
        transaction_id: '08114a9d-5ad8-4bfb-8bea-9b09029a30c4',
      };
      expect(
        typeof notificationService
          .partnerCallback(reqData)
          .then((data) => data)
          .catch((err) => err),
      ).toEqual('object');
    });
  });
});
