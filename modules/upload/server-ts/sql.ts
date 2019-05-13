import { knex } from '@restapp/database-server-ts';

export default class Upload {
  public uploads() {
    return knex.select();
  }
}
