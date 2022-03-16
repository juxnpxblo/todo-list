import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import { todosRouter } from './todos/todos.router';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/todos', todosRouter);

if (!!process.env.DYNO) {
  app.use(express.static(path.resolve(__dirname, '../../client/dist')));

  app.get('*', function (req: Request, res: Response) {
    res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
  });
}

app.listen(process.env.PORT);
