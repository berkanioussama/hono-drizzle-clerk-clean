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