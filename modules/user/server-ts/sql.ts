import { knex } from '@restapp/database-server-ts';

export default class User {
  public users() {
    return knex.select();
  }
}
