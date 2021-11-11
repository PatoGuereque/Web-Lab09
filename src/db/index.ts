import mongoose from 'mongoose';
import { databaseUri } from '../config';

const connect = () => {
  if (!databaseUri) {
    throw new Error('Missing MONGODB_URI in env!');
  }

  mongoose.connect(databaseUri).catch((error) => console.error(error));
};

export { connect };
