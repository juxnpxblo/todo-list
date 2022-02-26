const PORT = process.env.PORT || 5000;

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const todosRouter = require('./routes/todosRouter');
app.use('/api/todos', todosRouter);

const inHeroku = !!process.env.DYNO;

if (inHeroku) {
  const path = require('path');

  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`running at http://localhost:${PORT}`));
