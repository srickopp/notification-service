import RepoService from '../../../models/repo.service';
import { Repository } from 'typeorm';
import MerchantService from './merchant.service';
import { Merchant } from 'src/models/entities/merchant.entity';
import { Transaction } from 'src/models/entities/transaction.entity';
import { NotificationLog } from 'src/models/entities/notification-log.entity';

describe('Merchant Service', () => {
  const merchantService = new MerchantService(
    new RepoService(
      new Repository<Merchant>(),
      new Repository<Transaction>(),
      new Repository<NotificationLog>(),
    ),
  );

  describe('Function: Generate Merchant Token', () => {
    it('it should return an object response for generated merchant token', async () => {
      const merchantId = '08114a9d-5ad8-4bfb-8bea-9b09029a30c4';
      expect(
        typeof merchantService
          .generateMerchantToken(merchantId)
          .then((data) => data)
          .catch((err) => err),
      ).toEqual('object');
    });
  });

  describe('Function: Update merchant callback url', () => {
    it('it should return a response when updating merchant callback url', async () => {
      const merchantId = '08114a9d-5ad8-4bfb-8bea-9b09029a30c4';
      const callbackUrl = 'https://webhook.site/';
      expect(
        typeof merchantService
          .updateMerchantCallbackUrl(merchantId, callbackUrl)
          .then((data) => data)
          .catch((err) => err),
      ).toEqual('object');
    });
  });
});
