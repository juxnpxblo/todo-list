const pool = require('../db');
let client, released;

const { Router } = require('express');
const todosRouter = Router();

todosRouter.route('/*').all((req, res, next) => {
  res.statusCode = 200;
  res.set('Content-Type', 'application/json');
  next();
});

todosRouter
  .route('/')
  .get(async (req, res) => {
    try {
      client = await pool.connect();
      released = false;
      const todos = await client.query('SELECT * FROM todos ORDER BY id');

      res.json(todos.rows);
    } catch (err) {
      console.error(err.message);
    } finally {
      if (!released) {
        client.release();
        released = true;
      }
    }
  })
  .post(async (req, res) => {
    try {
      const { text } = req.body;

      client = await pool.connect();
      released = false;
      const queryRes = await client.query(
        'INSERT INTO todos (text, checked) VALUES ($1, false) RETURNING *',
        [text]
      );

      res.json(queryRes.rows[0].id);
    } catch (err) {
      console.error(err.message);
    } finally {
      if (!released) {
        client.release();
        released = true;
      }
    }
  });

todosRouter
  .route('/:id')
  .put(async (req, res) => {
    try {
      const { operation, payload } = req.body;
      const { id } = req.params;

      client = await pool.connect();
      released = false;

      if (!operation) {
        res.json('no operation provided');
      } else if (operation === 'RENAME') {
        await client.query('UPDATE todos SET text = $1 WHERE id = $2', [
          payload,
          id,
        ]);

        res.json('todo updated');
      } else if (operation === 'CHECK') {
        await client.query('UPDATE todos SET checked = $1 WHERE id = $2', [
          payload,
          id,
        ]);
        res.json('todo (un)checked');
      } else {
        res.json('this operation does not exist');
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      if (!released) {
        client.release();
        released = true;
      }
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;

      client = await pool.connect();
      released = false;
      const deletion = await client.query('DELETE FROM todos WHERE id = $1', [
        id,
      ]);

      res.json(`deleted ${deletion.rowCount} todos`);
    } catch (err) {
      console.error(err.message);
    } finally {
      if (!released) {
        client.release();
        released = true;
      }
    }
  });

module.exports = todosRouter;
