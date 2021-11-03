import { Module } from '@nestjs/common';
import { TwitterService } from '../application/service/twitter.service';
import { TwitterController } from '../presentation/controller/twitter.controller';

@Module({
  controllers: [TwitterController],
  providers: [TwitterService],
})
export class TwitterModule {}
