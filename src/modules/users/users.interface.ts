import { UsersEntity } from './users.entity';

export interface PartialUser extends UsersEntity {
  token?: string;
  refresh_token?: string;
}
