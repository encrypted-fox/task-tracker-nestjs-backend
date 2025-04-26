import { UsersEntity } from './users.entity';

export interface ExtendedUsersEntity extends UsersEntity {
  token?: string;
  refresh_token?: string;
}
