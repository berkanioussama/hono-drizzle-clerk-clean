export interface CreateUserInputDTO {
  name: string;
  email: string;
}

export interface CreateUserOutputDTO {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}