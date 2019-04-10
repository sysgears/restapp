import { knex } from '@restapp/database-server-ts';

export default class $Module$ {
  public $module$s() {
    return knex.select();
  }
}
