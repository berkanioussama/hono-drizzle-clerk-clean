import { Role } from "../../domain/user.entity";

export interface UserDTO {
  id: string;
  providerId: string;
  name: string;
  email: string;
  image: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export type AddUserDTO = Omit<UserDTO, 'id' | 'role' | 'createdAt' | 'updatedAt'>;

export type EditUserDTO =
  Pick<UserDTO, 'id' | 'providerId'> &
  Partial< Omit<UserDTO, 'id' | 'providerId' | 'role' | 'createdAt' | 'updatedAt'> >;

export type FindUserDTO = Pick<UserDTO, 'id' | 'providerId'>

export type FindUserByProviderIdDTO = Pick<UserDTO, 'providerId'>

export type FindUserByEmailDTO = Pick<UserDTO, 'email' | 'providerId'>

export type RemoveUserDTO = Pick<UserDTO, 'id'>

export type RemoveUserByProviderIdDTO = Pick<UserDTO, 'providerId'>