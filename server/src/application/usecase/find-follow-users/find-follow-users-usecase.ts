import { Injectable } from '@nestjs/common';

export interface IFindFollowUsersUsecase {
  exec(username: string);
  getFollowUsers(username: string);
}

@Injectable()
export class FindFollowUsersUsecase implements IFindFollowUsersUsecase {
  public exec(username: string) {
    return username;
  }

  public getFollowUsers(username: string) {
    return username;
  }
}
