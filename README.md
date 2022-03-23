# To-do list web app

[preview]: https://github.com/juxnpxblo/todo-list/blob/master/preview.png
[hosting]: https://todo-list-juxnpxblo.herokuapp.com/

![][preview]
#### You can check it out [here][hosting]!

## About the project

This is a very simple to-do web app built for practice purposes. It was bootstrapped with [Vite](https://vitejs.dev/). 

## Built with

  * [React](https://reactjs.org/) — A JavaScript library for building user interfaces
  * [Redux](https://redux.js.org/)  — A Predictable State Container for JS Apps
  * [TailwindCSS](https://tailwindcss.com/)  — Utility-first CSS framework for rapidly building custom user interfaces
  * [React Icons](https://react-icons.github.io/react-icons/) — SVG React icons of popular icon packs
  * [Express](https://expressjs.com/)  — Fast, unopinionated, minimalist web framework for Node.js
  * [PostgreSQL](https://www.postgresql.org/) — The World's Most Advanced Open Source Relational Database

## Getting started

### Prerequisites

  * [concurrently](https://www.npmjs.com/package/concurrently) — to serve React and Node.js concurrently
   ```sh
  npm install -g concurrently
  ```

  * [ts-node](https://www.npmjs.com/package/ts-node) — to execute the back-end Typescript files
   ```sh
  npm install -g ts-node
  ```

  * [nodemon](https://www.npmjs.com/package/nodemon) — to restart the servers on change
 ```sh
  npm install -g nodemon
  ```

### Installation

1. Clone the repo and enter its folder
```sh
git clone https://github.com/juxnpxblo/todo-list.git
cd chat
```
2. Enter the server folder, install packages, then create a `.env` file and open it
```sh
cd server
npm install
touch .env
code .env
```
3. Now you'll create 2 variables, the first one is the variable `PORT` — a port of your choice to run the back-end server on:
```
PORT="5000"
```
4. And the variable `DATABASE_URL` — representing the connection to an empty Postgres database:
```
DATABASE_URL="postgres://user:secret@localhost:5432/mydatabasename"
```
_the value used here was just an example of a local database connection, the format is `postgres://[user]:[password]@[host]:[port]/[db_name]` (if you don't know how to setup a Postgres database or want a remote one, you can easily get a [Heroku Postgres](https://www.heroku.com/postgres) database already setup for you_)

5. Now enter the client folder, install packages, then create a `.env.local` file and open it
```sh
cd ../client
npm install
touch .env.local
code .env.local
```
6. And create the following variable — the full URL to the Node.js server; if you'd chosen the port 5000 to run the server on for example, it'd look like this:
```
VITE_SERVER_URL="http://localhost:5000"
```
7. The last thing you'll need to do is to reach out to the file `chat/server/src/config/database/init.sql` and make sure to run those SQL statements in your database to set it up; after that, everything is properly set up for development, so just go back to the main folder and run
```sh
cd ..
npm run dev
```

## Deployment

### Heroku

This project is ready for Heroku deployment, you just have to make sure the `DATABASE_URL` variable is set in the Heroku environment and that your database can be accessed remotely. The initial SQL statements located in the `init.sql` file automatically run on every deploy. For more information on Heroku deployment, you can check out [their docs on this subject](https://devcenter.heroku.com/categories/deployment).

### Other platforms

The project will probably need to be reconfigured to be deployed to any other platform.

## License

Distributed under the **MIT License**. See `LICENSE.txt` for more information.
