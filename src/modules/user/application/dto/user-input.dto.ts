export interface CreateUserInputDTO {
  clerkUserId: string;
  name: string;
  email: string;
}

export interface GetUserInputDTO {
  id: string;
  clerkUserId: string;
}

export interface UpdateUserInputDTO {
  id: string;
  name?: string;   // optional
  email?: string;  // optional
}

export interface DeleteUserInputDTO {
  id: string;
}

export interface DeleteUserByClerkInputDTO {
  clerkUserId: string;
}