import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

export interface IFindFollowUsersUsecase {
  exec(id: number | bigint);
  getFollowUsers(id: number | bigint);
}

@Injectable()
export class FindFollowUsersUsecase implements IFindFollowUsersUsecase {
  public constructor(private readonly httpService: HttpService) {}
  public exec(id: number | bigint) {
    return this.getFollowUsers(id);
  }

  public async getFollowUsers(id: number | bigint) {
    try {
      const response = await this.httpService
        .get(
          `${process.env.Twitter_API_Base_Url}/users/${id}/followers?max_results=100`,
        )
        .toPromise();
      return response.data;
    } catch (error) {
      throw new Error(`getFollowUsers API Error: ${error}`);
    }
  }
}
