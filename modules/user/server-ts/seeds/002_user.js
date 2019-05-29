import bcrypt from 'bcryptjs';
import { returnId, truncateTables } from '@restapp/database-server-ts';

export async function seed(knex, Promise) {
  await truncateTables(knex, Promise, ['user', 'user_profile', 'auth_facebook', 'auth_github', 'auth_linkedin']);

  await returnId(knex('user')).insert({
    username: 'admin',
    email: 'admin@example.com',
    password_hash: await bcrypt.hash('admin123', 12),
    role: 'admin',
    is_active: true
  });

  await returnId(knex('user')).insert({
    username: 'user',
    email: 'user@example.com',
    password_hash: await bcrypt.hash('user1234', 12),
    role: 'user',
    is_active: true
  });
}
