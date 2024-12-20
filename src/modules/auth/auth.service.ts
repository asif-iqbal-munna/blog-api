import { User } from '../user/user.model';
import { IUserRegister } from './auth.interface';

const registerUserIntoDb = async (user: IUserRegister) => {
  return User.create(user);
};

export const AuthServices = {
  registerUserIntoDb,
};
