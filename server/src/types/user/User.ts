import { Types } from 'mongoose';
import type { UserBlocked } from './UserBlocked';
import type { UserInfo } from './UserInfo';
import type { UserNotifications } from './UserNotifications';
import type { UserPrivate } from './UserPrivate';

export interface User {
  _id: string;
  email: string;
  updatedAt?: string;
  roles: string[];
  info: UserInfo;
  private: UserPrivate;
  blocked?: UserBlocked;
  notifications?: UserNotifications;
  cart: Types.ObjectId[];
}

export interface UserWithoutId extends Omit<User, '_id'> {}
