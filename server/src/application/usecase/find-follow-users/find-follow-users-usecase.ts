import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

export interface IFindFollowUsersUsecase {
  exec(id: number | bigint): Promise<IFindFollowUsers[]>;
  getFollowUsers(id: number | bigint): Promise<IGetFollowUsers>;
}

export interface IGetFollowUsers {
  data: {
    id: string;
    name: string;
    username: string;
  }[];
}

export interface IFindFollowUsers {
  id: string;
  name: string;
  username: string;
}
[];

@Injectable()
export class FindFollowUsersUsecase implements IFindFollowUsersUsecase {
  public constructor(private readonly httpService: HttpService) {}
  public async exec(id: number | bigint): Promise<IFindFollowUsers[]> {
    const followers = await this.getFollowUsers(id);
    return followers.data;
  }

  public async getFollowUsers(id: number | bigint): Promise<IGetFollowUsers> {
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
