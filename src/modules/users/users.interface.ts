import { UserEntity } from './users.entity';

export interface PartialUser extends UserEntity {
  token?: string;
  refresh_token?: string;
}
