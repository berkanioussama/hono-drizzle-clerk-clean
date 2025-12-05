export interface UserProps {
  id: string;
  authProviderId: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    if(props.name.trim().length < 2) {
      throw new Error("Name must be at least 2 characters.")
    }
    if(!props.email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error("Invalid email.")
    }
    this.props = props
  }

  changeName(newName: string) {
    if (!newName || newName.trim().length < 2) {
      throw new Error("Name must be at least 2 characters.")
    }
    this.props.name = newName.trim()
  }

  changeEmail(newEmail: string) {
    if(!newEmail.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error("Invalid email.")
    }
    this.props.email = newEmail.trim()
  }

  changeUpdatedAt(newUpdatedAt: Date) {
    this.props.updatedAt = newUpdatedAt
  }

  get id() { return this.props.id }
  get authProviderId() { return this.props.authProviderId }
  get name() { return this.props.name }
  get email() { return this.props.email }
  get createdAt() { return this.props.createdAt }
  get updatedAt() { return this.props.updatedAt }
  
  toJSON(): UserProps { return this.props }
}