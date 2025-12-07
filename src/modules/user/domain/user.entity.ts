import { Email } from "@/modules/user/domain/user.vo";

export interface UserProps {
  id: string;
  authProviderId: string;
  name: string;
  email: Email;
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

  changeUpdatedAt(newUpdatedAt: Date) {
    this.props.updatedAt = newUpdatedAt
  }

  get id() { return this.props.id }
  get authProviderId() { return this.props.authProviderId }
  get name() { return this.props.name }
  get email() { return this.props.email.toString() }
  get createdAt() { return this.props.createdAt }
  get updatedAt() { return this.props.updatedAt }
  
  toJSON() { return { ...this.props, email: this.props.email.toString() } }
}