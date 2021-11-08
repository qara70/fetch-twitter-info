import { Module } from '@nestjs/common';
import { FindTweetedUsersUsecase } from 'src/application/usecase/find-tweeted-users/find-tweeted-users-usecase';
import { TwitterService } from '../application/service/twitter.service';
import { TwitterController } from '../presentation/controller/twitter.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from 'src/infrastructure/http-config-service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
  ],
  controllers: [TwitterController],
  providers: [FindTweetedUsersUsecase, TwitterService],
})
export class TwitterModule {}
