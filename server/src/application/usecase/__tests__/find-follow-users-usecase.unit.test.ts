import { Test } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { FindFollowUsersUsecase } from '../find-follow-users/find-follow-users-usecase';
import { ConfigModule } from '@nestjs/config';
import { HttpConfigService } from 'src/infrastructure/http-config-service';

describe('FindFollowUsersUsecase', () => {
  let findFollowUsersUsecase: FindFollowUsersUsecase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        HttpModule.registerAsync({ useClass: HttpConfigService }),
      ],
      providers: [FindFollowUsersUsecase],
    }).compile();

    findFollowUsersUsecase = moduleRef.get<FindFollowUsersUsecase>(
      FindFollowUsersUsecase,
    );
  });

  describe('正常系', () => {
    it('exec()でフォロワー情報が100件取得できる', async () => {
      expect(
        await findFollowUsersUsecase.exec(1099576439513333760n),
      ).toHaveLength(100);
    });
  });
});
