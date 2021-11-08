import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwitterModule } from './nest-module/twitter.module';

@Module({
  imports: [
    TwitterModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class Modules {}

async function bootstrap() {
  const app = await NestFactory.create(Modules);
  await app.listen(3000);
}
bootstrap();
