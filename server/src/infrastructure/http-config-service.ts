import { HttpModuleOptionsFactory, Injectable } from '@nestjs/common';
import { HttpModuleOptions } from '@nestjs/common';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: process.env.Twitter_API_Base_Url,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.Twitter_Bearer_Token}`,
      },
    };
  }
}
