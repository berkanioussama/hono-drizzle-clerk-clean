import { Role } from "@/modules/user/domain/user.entity";

export interface UserOutputDTO {
  id: string;
  providerId: string;
  name: string;
  email: string;
  image: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export type AddUserInputDTO = Omit<UserOutputDTO, 'id' | 'role' | 'createdAt' | 'updatedAt'>;

export type EditUserInputDTO =
  Pick<UserOutputDTO, 'id' | 'providerId'> &
  Partial< Omit<UserOutputDTO, 'id' | 'providerId' | 'role' | 'createdAt' | 'updatedAt'> >;

export type FindUserInputDTO = Pick<UserOutputDTO, 'id' | 'providerId'>

export type FindUserByProviderIdInputDTO = Pick<UserOutputDTO, 'providerId'>

export type FindUserByEmailInputDTO = Pick<UserOutputDTO, 'email' | 'providerId'>

export type RemoveUserInputDTO = Pick<UserOutputDTO, 'id'>

export type RemoveUserByProviderIdInputDTO = Pick<UserOutputDTO, 'providerId'>