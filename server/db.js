const dbUrl =
  process.env.DATABASE_URL ||
  'postgres://bddnfuxhmhcatl:38c3aeaa7ebb115c022d1767552096e217e1b93b1298ec2fae089e1b00d0293c@ec2-34-233-157-189.compute-1.amazonaws.com:5432/dbs7pc7gudtsi';

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
