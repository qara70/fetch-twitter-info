import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TwitterController } from './presentation/controller/twitter.controller';
import { TwitterService } from './application/service/twitter.service';

@Module({
  imports: [],
  controllers: [TwitterController],
  providers: [TwitterService],
})
export class Modules {}

async function bootstrap() {
  const app = await NestFactory.create(Modules);
  await app.listen(3000);
}
bootstrap();
