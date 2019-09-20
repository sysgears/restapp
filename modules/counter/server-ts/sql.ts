import { knex } from '@restapp/database-server-ts';

class CounterDAO {
  public counterQuery() {
    return knex('counter').first();
  }

  public addCounter(amount: number) {
    return knex('counter').increment('amount', amount);
  }
}

const counterDAO = new CounterDAO();

export default counterDAO;
