import dotenv from 'dotenv';

import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};
