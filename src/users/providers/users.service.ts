import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamsDto } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  public finAll(
    getUsersParamsDto: GetUsersParamsDto,
    limit: number,
    page: number,
  ) {
    // Auth Service
    const isAuth = this.authService.isAuth();
    console.log('isAuth', isAuth);
    return [
      {
        firstName: 'Hùng',
        lastName: 'nguyenhung016446@gmail.com',
      },
      {
        firstName: 'Trúc',
        lastName: 'nguyenhung016447@gmail.com',
      },
    ];
  }

  // tìm một người dùng theo id
  public findOneById(id: string) {
    return {
      id: 1234,
      firstName: 'Hùng',
      email: 'nguyenhung016446@gmail.com',
    };
  }
}
