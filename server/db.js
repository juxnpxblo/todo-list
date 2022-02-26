const dbUrl =
  process.env.DATABASE_URL ||
  'postgres://skbflmbumrmrol:116dbe078959430d0034b7339e7f4aed979f6dfb68be7f7a9e70cdb5337d9c60@ec2-44-194-54-186.compute-1.amazonaws.com:5432/d7814u25k5f8kv';

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
