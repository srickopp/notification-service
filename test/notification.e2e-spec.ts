import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import MerchantService from '../src/modules/notification/services/merchant.service';
import NotificationService from '../src/modules/notification/services/notification.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../src/ormconfig';
import { Merchant } from '../src/models/entities/merchant.entity';
import { Transaction } from '../src/models/entities/transaction.entity';
import { AppModule } from '../src/app.module';
import { NotificationController } from '../src/modules/notification/notification.controller';

describe('Notification', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const NotificationServiceProvider = {
      provide: NotificationService,
      useFactory: () => ({
        manualNotifcationPayment: jest.fn(() => {
          return {
            statusCode: 200,
            message: 'SUCCESS',
            data: new Transaction(),
          };
        }),
        partnerCallback: jest.fn(() => {
          return {
            statusCode: 200,
            message: 'SUCCESS',
          };
        }),
      }),
    };

    const MerchantServiceProvider = {
      provide: MerchantService,
      useFactory: () => ({
        generateMerchantToken: jest.fn(() => {
          return {
            statusCode: 200,
            message: 'SUCCESSS',
            data: new Merchant(),
          };
        }),
        updateMerchantCallbackUrl: jest.fn(() => {
          return {
            statusCode: 200,
            message: 'SUCCESSS',
            data: new Merchant(),
          };
        }),
      }),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        MerchantService,
        MerchantServiceProvider,
        NotificationService,
        NotificationServiceProvider,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Notification Module', () => {
    it('Return response for callback partner function', async () => {
      await request(app.getHttpServer())
        .post('/notification/callback')
        .send({ transaction_id: '08114a9d-5ad8-4bfb-8bea-9b09029a30c4' })
        .expect(200);
    });

    it('Return response for manual retry function', async () => {
      await request(app.getHttpServer())
        .post('/notification/transaction/retry')
        .send({ transaction_id: '08114a9d-5ad8-4bfb-8bea-9b09029a30c4' })
        .expect(200);
    });

    it('Return response for merchant generate key function', async () => {
      await request(app.getHttpServer())
        .post('/notification/merchant/generate-key')
        .send({ merchant_id: '08114a9d-5ad8-4bfb-8bea-9b09029a30c4' })
        .expect(200);
    });

    it('Return response for merchant change the callback url function', async () => {
      await request(app.getHttpServer())
        .put(
          '/notification/merchant/08114a9d-5ad8-4bfb-8bea-9b09029a30c4/callback',
        )
        .send({ callback_url: '08114a9d-5ad8-4bfb-8bea-9b09029a30c4' })
        .expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
