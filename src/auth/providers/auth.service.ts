import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  public login(email: string, password: string, id: string) {
    // Kiểm tra người dùng tồn tại CSDL
    const user = this.usersService.findOneById('1234');
    // Login
    // Token
    return 'SAMPLE_TOKEN';
  }
  public isAuth() {
    return true;
  }
}
