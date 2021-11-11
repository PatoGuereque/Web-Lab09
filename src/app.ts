import express from 'express';
import morgan from 'morgan';
import { router } from './routes';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/', router);

export { app };
