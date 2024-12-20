/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, UserModel, IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.checkUserExistByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password');
};

userSchema.statics.checkUserExistById = async function (
  id: mongoose.Types.ObjectId,
) {
  return await this.findById(id);
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcryptSaltRounds),
  );

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
