import { readFileSync } from 'fs';
import { useQuery } from './db';

(async () => {
  console.log('\nSetting up database...');

  const queries = readFileSync('./init.sql').toString().split(';');

  for (let query of queries) {
    await useQuery(query);
  }
})();
