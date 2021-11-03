import { Controller, Get, Param, Delete } from '@nestjs/common';
import { TwitterService } from '../../application/service/twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Get()
  findAll() {
    return this.twitterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.twitterService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.twitterService.remove(+id);
  }
}
