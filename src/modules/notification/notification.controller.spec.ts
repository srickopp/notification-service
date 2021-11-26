/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { Merchant } from '../../models/entities/merchant.entity';
import { Transaction } from '../../models/entities/transaction.entity';
import { PartnerCallbackReq } from '../../modules/dto/partner-callback.dto';
import { EditCallback } from '../dto/edit-callback.dto';
import { GenerateKey } from '../dto/generate-key.dto';
import { ManualRetry } from '../dto/manual-retry.dto';
import { NotificationController } from './notification.controller';
import MerchantService from './services/merchant.service';
import NotificationService from './services/notification.service';

describe('Notification Controller', () => {
  let notifController: NotificationController;
  let merchantService: MerchantService;
  let notifService: NotificationService;

  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeAll(async () => {
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

    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        MerchantService,
        MerchantServiceProvider,
        NotificationService,
        NotificationServiceProvider,
      ],
    }).compile();

    notifController = app.get<NotificationController>(NotificationController);
    merchantService = app.get<MerchantService>(MerchantService);
    notifService = app.get<NotificationService>(NotificationService);
  });

  it('calling partnerCallback method', async () => {
    const dto = new PartnerCallbackReq();
    const response = mockResponse();

    expect(await notifController.partnerCallback(dto, response)).toEqual(
      response,
    );
  });

  it('calling manualNotifcationPayment method', async () => {
    const dto = new ManualRetry();
    const response = mockResponse();

    expect(
      await notifController.manualNotifcationPayment(dto, response),
    ).toEqual(response);
  });

  it('calling generateMerchantKey method', async () => {
    const dto = new GenerateKey();
    const response = mockResponse();

    expect(await notifController.generateMerchantKey(dto, response)).toEqual(
      response,
    );
  });

  it('calling editMerchantCallback method', async () => {
    const dto = new EditCallback();
    const id = '';
    const response = mockResponse();

    expect(
      await notifController.editMerchantCallback(id, dto, response),
    ).toEqual(response);
  });
});
