import { Router, Request, Response } from 'express';
import { getAll, add, edit, check, remove } from './todos.service';
import { AddBody, EditBody, CheckBody } from './body.interface';
import { TodoId } from './todo.interface';

export const todosRouter = Router();

todosRouter.get('/', async (req: Request, res: Response) => {
  try {
    const result = await getAll();
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
});

todosRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { text } = req.body as AddBody;

    const result = await add(text);
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
});

todosRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as TodoId;
    const { payload }: EditBody | CheckBody = req.body;

    if (typeof payload === 'boolean') {
      await check(id, !payload);
      res.status(200).json('[un]checked');
    } else if (typeof payload === 'string') {
      await edit(id, payload);
      res.status(200).json('edited');
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(404).send(err.message);
    }
  }
});

todosRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as TodoId;

    await remove(id);
    res.status(204).json('deleted');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(404).send(err.message);
    }
  }
});
