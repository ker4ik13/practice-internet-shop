import type { Product } from "../product";
import type { UserBlocked } from "./UserBlocked";
import type { UserInfo } from "./UserInfo";
import type { UserNotifications } from "./UserNotifications";
import type { UserPrivate } from "./UserPrivate";

export interface User {
  _id: string;
  email: string;
  updatedAt?: string;
  roles: string[];
  info: UserInfo;
  private: UserPrivate;
  blocked?: UserBlocked;
  notifications?: UserNotifications;
  cart: Product[];
}

export interface UserWithoutId extends Omit<User, "_id"> {}
