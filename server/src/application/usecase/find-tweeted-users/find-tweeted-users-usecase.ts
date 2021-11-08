import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

export interface IFindTweetedUsersUsecase {
  exec(query: IFindTweetedUsersUsecaseQuery);
  getTweetedUsers(query: IFindTweetedUsersUsecaseQuery);
}

export type IFindTweetedUsersUsecaseQuery = {
  query: string;
  start_time?: string;
  end_time?: string;
  max_results?: number;
  expansions: string;
  'user.fields'?: string;
};

export interface IFindTweetedUser {
  id: string;
  author_id: string;
  text: string;
  name: string;
  username?: string;
  created_at?: string;
}

export interface GetTweetedUsersResponse {
  data: {
    author_id: string;
    id: string;
    text: string;
  }[];
  includes?: {
    users: {
      id: string;
      name: string;
      user_name: string;
      description?: string;
      created_at?: string;
    }[];
  };
}

@Injectable()
export class FindTweetedUsersUsecase implements IFindTweetedUsersUsecase {
  public constructor(private readonly httpService: HttpService) {}

  public async exec(query: IFindTweetedUsersUsecaseQuery): Promise<any> {
    const tweetedUsers = await this.getTweetedUsers(query);
    return this.build(tweetedUsers);
  }

  public async getTweetedUsers(
    query: IFindTweetedUsersUsecaseQuery,
  ): Promise<GetTweetedUsersResponse> {
    try {
      const response = await this.httpService
        .get(
          `${
            process.env.Twitter_API_Base_Url
          }/tweets/search/recent?query=${this.constructGetUsersQueries(query)}`,
        )
        .toPromise();
      return response.data;
    } catch (error) {
      throw new Error(`getUsers API Error: ${error}`);
    }
  }

  public async getTweet(id: bigint | number) {
    try {
      const response = await this.httpService
        .get(`${process.env.Twitter_API_Base_Url}/tweets/${id}`)
        .toPromise();
      return response.data;
    } catch (error) {
      throw new Error(`getTweet API Error: ${error}`);
    }
  }

  public build(users: GetTweetedUsersResponse): IFindTweetedUser[] {
    const users_info: IFindTweetedUser[] = users.includes.users.map(
      (include, index) => {
        return {
          ...users.data[index],
          ...include,
        };
      },
    );
    return users_info;
  }

  public constructGetUsersQueries(
    query: IFindTweetedUsersUsecaseQuery,
  ): string {
    let constructedQuery = '';
    query.query
      ? (constructedQuery += `${query['query']}`)
      : (constructedQuery += '');
    query.start_time
      ? (constructedQuery += `&start_time=${query['start_time']}`)
      : '';
    query.end_time
      ? (constructedQuery += `&end_time=${query['end_time']}`)
      : '';
    query.max_results
      ? (constructedQuery += `&max_results=${query['max_results']}`)
      : '';
    query.expansions
      ? (constructedQuery += `&expansions=author_id,${query['expansions']}`)
      : (constructedQuery += '&expansions=author_id');
    query['user.fields']
      ? (constructedQuery += `&user.fields=${query['user.fields']}`)
      : (constructedQuery += '&user.fields=');
    return constructedQuery;
  }
}
