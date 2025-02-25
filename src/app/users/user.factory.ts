import { User } from "./user.type";

export class UserFactory {
  public static createUser(): User {
    return {
      id: 0,
      email: '',
      username: ''
    }
  }
}