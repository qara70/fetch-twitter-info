import { Controller, Get, Query } from '@nestjs/common';
import {
  IFindTweetedUsersUsecase,
  IFindTweetedUsersUsecaseQuery,
} from 'src/application/usecase/find-tweeted-users/find-tweeted-users-usecase';

@Controller('twitter')
export class TwitterController {
  constructor(
    private readonly findTweetedUsersUsecase: IFindTweetedUsersUsecase,
  ) {}

  @Get()
  getTweetedUsers(@Query() query: IFindTweetedUsersUsecaseQuery) {
    return this.findTweetedUsersUsecase.exec(query);
  }
}
