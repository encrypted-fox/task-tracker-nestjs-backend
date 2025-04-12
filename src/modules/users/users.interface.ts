import { UserDTO } from './users.entity';

export interface PartialUser extends UserDTO {
  token?: string;
  refresh_token?: string;
}
