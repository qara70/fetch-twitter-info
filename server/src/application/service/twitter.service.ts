import { Injectable } from '@nestjs/common';

@Injectable()
export class TwitterService {
  findAll() {
    return `This action returns all twitter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} twitter`;
  }

  remove(id: number) {
    return `This action removes a #${id} twitter`;
  }
}
