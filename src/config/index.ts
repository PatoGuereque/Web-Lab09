import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const port = process.env.PORT || 8000;
const databaseUri = process.env.MONGODB_URI;

export { port, databaseUri };
