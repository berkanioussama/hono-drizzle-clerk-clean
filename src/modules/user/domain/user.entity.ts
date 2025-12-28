import { Email } from "@/modules/user/domain/user.vo";

export enum Role { USER = "user", ADMIN = "admin" }

export interface CreateUserProps {
  providerId: string;
  name: string;
  email: Email;
  image: string;
}
export interface UserProps extends CreateUserProps {
  id: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private constructor(private readonly props: UserProps) {
    this.validate();
  }

  static create(props: CreateUserProps): User {
    if (props.name.trim().length < 2) {
      throw new Error("Name must be at least 2 characters.");
    }
    if (!(props.email instanceof Email)) {
      throw new Error("Email must be an Email instance");
    }

    return new User({
      ...props,
      id: crypto.randomUUID(),
      role: Role.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static fromPersistence(props: UserProps): User {
    return new User(props);
  }

  private validate() {
    if (this.props.name.trim().length < 2) {
      throw new Error("Name must be at least 2 characters.");
    }
    if (!(this.props.email instanceof Email)) {
      throw new Error("Email must be an Email instance");
    }
  }

  changeName(newName: string) {
    if (!newName || newName.trim().length < 2) {
      throw new Error("Name must be at least 2 characters.");
    }
    this.props.name = newName.trim();
    this.props.updatedAt = new Date();
  }

  changeEmail(newEmail: Email) {
    this.props.email = newEmail;
    this.props.updatedAt = new Date();
  }

  changeImage(newImage: string) {
    if (!newImage || newImage.trim().length < 3) {
      throw new Error("Invalid image URL.");
    }
    this.props.image = newImage;
    this.props.updatedAt = new Date();
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