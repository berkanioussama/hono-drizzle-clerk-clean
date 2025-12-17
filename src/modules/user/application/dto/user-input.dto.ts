export interface AddUserInputDTO {
  providerId: string;
  name: string;
  email: string;
  image: string;
}

export interface EditUserInputDTO {
  id: string;
  name?: string;   // optional
  email?: string;  // optional
  image?: string;  // optional
}

export interface FindUserInputDTO {
  id: string;
  providerId: string;
}

export interface FindUserByProviderIdInputDTO {
  providerId: string;
}

export interface FindUserByEmailInputDTO {
  email: string;
  providerId: string;
}

export interface RemoveUserInputDTO {
  id: string;
}

export interface RemoveUserByProviderIdInputDTO {
  providerId: string;
}