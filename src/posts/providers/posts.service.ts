import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}
  public finAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    return [
      {
        user: user,
        title: 'Hello world',
        content: 'This is my first post',
      },
      {
        user: user,
        title: 'Hello world 1',
        content: 'This is my first post 1',
      },
    ];
  }
}
