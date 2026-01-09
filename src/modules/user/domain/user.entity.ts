import { Email, ProviderId, ImageUrl } from "./user.vo";

export enum Role { USER = "user", ADMIN = "admin" }

export interface CreateUserProps {
  providerId: ProviderId;
  name: string;
  email: Email;
  image: ImageUrl;
}
export interface UserProps extends CreateUserProps {
  id: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private constructor(private props: UserProps) {}

  static create(props: CreateUserProps): User {
    this.validate(props);
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

  private static readonly NAME_MIN_LENGTH = 2;
  private static readonly NAME_MAX_LENGTH = 100;

  private static validate(props: CreateUserProps) {
    
    if (!(props.providerId instanceof ProviderId)) {
      throw new Error("Provider ID must be a ProviderId instance.");
    }
    if (props.name.trim().length < User.NAME_MIN_LENGTH || props.name.trim().length > User.NAME_MAX_LENGTH) {
      throw new Error(`Name must be between ${User.NAME_MIN_LENGTH} and ${User.NAME_MAX_LENGTH} characters.`);
    }
    if (!(props.email instanceof Email)) {
      throw new Error("Email must be an Email instance");
    }
    if (!(props.image instanceof ImageUrl)) {
      throw new Error("Image must be an ImageUrl instance");
    }
  }

  changeName(newName: string) {
    if (!newName || newName.trim().length < User.NAME_MIN_LENGTH) {
      throw new Error(`Name must be at least ${User.NAME_MIN_LENGTH} characters.`);
    }
    this.props.name = newName.trim();
    this.props.updatedAt = new Date();
  }

  changeEmail(newEmail: Email) {
    this.props.email = newEmail;
    this.props.updatedAt = new Date();
  }

  changeImage(newImage: ImageUrl) {
    this.props.image = newImage;
    this.props.updatedAt = new Date();
  }

  get id() { return this.props.id }
  get providerId() { return this.props.providerId }
  get name() { return this.props.name }
  get email() { return this.props.email }
  get image() { return this.props.image }
  get role() { return this.props.role }
  get createdAt() { return this.props.createdAt }
  get updatedAt() { return this.props.updatedAt }
}