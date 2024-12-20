import { User } from '../user/user.model';

const blockUserFromDb = async (id: string) => {
  return User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
};

export const AdminServices = {
  blockUserFromDb,
};
