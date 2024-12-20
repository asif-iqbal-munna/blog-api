/* eslint-disable no-unused-vars */
import mongoose, { Model, ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<IUser> {
  checkUserExistByEmail(email: string): Promise<IUser | null>;
  checkUserExistById(id: mongoose.Schema.Types.ObjectId): Promise<IUser | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
}
