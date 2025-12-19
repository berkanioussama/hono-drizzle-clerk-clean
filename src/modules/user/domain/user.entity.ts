import { Email } from "@/modules/user/domain/user.vo";

export enum Role { USER = "user", ADMIN = "admin" }

export interface UserProps {
  id: string;
  providerId: string;
  name: string;
  email: Email;
  image: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    if(props.name.trim().length < 2) {
      throw new Error("Name must be at least 2 characters.")
    }
    if (!(props.email instanceof Email)) {
      throw new Error('Email must be an instance of the Email class');
    }
    this.props = props
  }

  changeName(newName: string) {
    if (!newName || newName.trim().length < 2) {
      throw new Error("Name must be at least 2 characters.")
    }
    this.props.name = newName.trim()
  }
  changeEmail(newEmail: Email) {
    this.props.email = newEmail
  }
  changeImage(newImage: string) {
    if (!newImage || newImage.trim().length < 3) {
      throw new Error("Invalid image URL.")
    }
    this.props.image = newImage
  }
  changeUpdatedAt(newUpdatedAt: Date) {
    this.props.updatedAt = newUpdatedAt
  }

  get id() { return this.props.id }
  get providerId() { return this.props.providerId }
  get name() { return this.props.name }
  get email() { return this.props.email.toString() }
  get image() { return this.props.image }
  get role() { return this.props.role }
  get createdAt() { return this.props.createdAt }
  get updatedAt() { return this.props.updatedAt }
  
  toJSON() { return { ...this.props, email: this.props.email.toString() } }
}