import mongoose from 'mongoose';
import { app } from './app';
import { port } from './config';
import { connect } from './db';

connect();

mongoose.connection.once('open', () => {
  console.log('Connected to database!');

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});