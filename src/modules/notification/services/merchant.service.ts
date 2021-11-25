import { Injectable } from '@nestjs/common';
import RepoService from '../../../models/repo.service';
import * as crypto from 'crypto';

@Injectable()
export default class MerchantService {
  public constructor(private readonly repoService: RepoService) {}

  async generateMerchantToken(merchantId: string) {
    const merchant = await this.repoService.merchantRepo.findOne({
      id: merchantId,
    });

    if (!merchant) {
      return {
        statusCode: 404,
        message: 'MERCHANT_NOT_FOUND',
      };
    }

    try {
      // Generate Token
      const token = crypto.randomBytes(64).toString('hex');
      // Update Merchant token Info
      await this.repoService.merchantRepo.update(
        {
          id: merchantId,
        },
        {
          api_key: token,
        },
      );

      return {
        statusCode: 200,
        message: 'SUCCESS',
        data: await this.repoService.merchantRepo.findOne(),
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'INTERNAL_ERROR',
        error: error.message,
      };
    }
  }

  async updateMerchantCallbackUrl(merchantId: string, callbackUrl: string) {
    const merchant = await this.repoService.merchantRepo.find({
      id: merchantId,
    });

    if (!merchant) {
      return {
        statusCode: 404,
        message: 'MERCHANT_NOT_FOUND',
      };
    }

    try {
      // Update Merchant token Info
      await this.repoService.merchantRepo.update(
        {
          id: merchantId,
        },
        {
          callback_url: callbackUrl,
        },
      );

      return {
        statusCode: 200,
        message: 'SUCCESS',
        data: await this.repoService.merchantRepo.findOne(),
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'INTERNAL_ERROR',
        error: error.message,
      };
    }
  }
}
