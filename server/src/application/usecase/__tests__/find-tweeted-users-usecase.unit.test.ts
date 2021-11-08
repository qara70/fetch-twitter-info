import { Test } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { FindTweetedUsersUsecase } from '../find-tweeted-users/find-tweeted-users-usecase';
import { ConfigModule } from '@nestjs/config';
import { HttpConfigService } from 'src/infrastructure/http-config-service';

describe('FindTweetedUsersUsecase', () => {
  let findTweetedUsersUsecase: FindTweetedUsersUsecase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        HttpModule.registerAsync({ useClass: HttpConfigService }),
      ],
      providers: [FindTweetedUsersUsecase],
    }).compile();

    findTweetedUsersUsecase = moduleRef.get<FindTweetedUsersUsecase>(
      FindTweetedUsersUsecase,
    );
  });

  describe('正常系', () => {
    it('getUsers()でユーザー情報が取得できる', async () => {
      console.log('getFollowers');
      console.log(
        await findTweetedUsersUsecase.exec({
          query: 'DDD',
          expansions: '',
        }),
      );
    });
  });
});
