export interface PartialUser {
  id?: number;
  username?: string;
  isActive?: boolean;
  password?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  avatar?: string;
  description?: string;
  roles?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  token?: string;
}