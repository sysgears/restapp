import { knex } from '@restapp/database-server-ts';

export default class Welcome {
  public welcomes() {
    return knex.select();
  }
}
