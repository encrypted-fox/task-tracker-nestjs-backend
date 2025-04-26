import { Controller } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/users')
export class UsersController extends BaseController<UsersEntity, UsersService> {
  constructor(private usersService: UsersService) {
    const usersFields = [
      'id',
      'username',
      'email',
      'phone',
      'firstName',
      'middleName',
      'lastName',
      'avatar',
      'teams',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(usersFields, usersService);
  }
}
