import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  IFindTweetedUsersUsecase,
  IFindTweetedUsersUsecaseQuery,
} from 'src/application/usecase/find-tweeted-users/find-tweeted-users-usecase';
import { IFindFollowUsersUsecase } from 'src/application/usecase/find-follow-users/find-follow-users-usecase';

@Controller('twitter')
export class TwitterController {
  constructor(
    private readonly findTweetedUsersUsecase: IFindTweetedUsersUsecase,
    private readonly findFollowUsersUsecase: IFindFollowUsersUsecase,
  ) {}

  @Get('tweeted/user')
  getTweetedUsers(@Query() query: IFindTweetedUsersUsecaseQuery) {
    return this.findTweetedUsersUsecase.exec(query);
  }

  @Get('follow/user/:username')
  getFollowUsers(@Param('username') username: string) {
    return this.findFollowUsersUsecase.exec(username);
  }
}
