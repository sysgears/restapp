// Helpers
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { has } from 'lodash';
import bcrypt from 'bcryptjs';
import { knex, returnId } from '@restapp/database-server-ts';

export interface UserFileds extends User, UserPassword, UserProfile {}

export interface User {
  id: number;
  username: string;
  role: string;
  isActive: boolean;
  email: string;
}

export interface UserPassword {
  passwordHash: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
}

interface OrderBy {
  column: string;
  order: string;
}

interface Filter {
  role: string;
  isActive: boolean;
  searchText: string;
}

interface SocialInterface {
  id: number;
  displayName: string;
  userId: number;
}

interface Profile {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
}

const userColumns = ['u.id', 'u.username', 'u.role', 'u.is_active', 'u.email', 'up.first_name', 'up.last_name'];
const userColumnsWithSocial = [
  ...userColumns,
  'fa.fb_id',
  'fa.display_name AS fbDisplayName',
  'lna.ln_id',
  'lna.display_name AS lnDisplayName',
  'gha.gh_id',
  'gha.display_name AS ghDisplayName',
  'ga.google_id',
  'ga.display_name AS googleDisplayName'
];
const userColumnsWithPassword = [...userColumns, 'u.password_hash'];

class UserDAO {
  public async getUsers(orderBy: OrderBy, filter: Filter) {
    const queryBuilder = knex
      .select(...userColumnsWithSocial)
      .from('user AS u')
      .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
      .leftJoin('auth_facebook AS fa', 'fa.user_id', 'u.id')
      .leftJoin('auth_google AS ga', 'ga.user_id', 'u.id')
      .leftJoin('auth_github AS gha', 'gha.user_id', 'u.id')
      .leftJoin('auth_linkedin AS lna', 'lna.user_id', 'u.id');

    // add order by
    if (orderBy && orderBy.column) {
      const column = orderBy.column;
      let order = 'asc';
      if (orderBy.order) {
        order = orderBy.order;
      }

      queryBuilder.orderBy(decamelize(column), order);
    }

    // add filter conditions
    if (filter) {
      if (has(filter, 'role') && filter.role !== '') {
        queryBuilder.where(function() {
          this.where('u.role', filter.role);
        });
      }

      if (has(filter, 'isActive') && filter.isActive !== null) {
        queryBuilder.where(function() {
          this.where('u.is_active', filter.isActive);
        });
      }

      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where(knex.raw('LOWER(??) LIKE LOWER(?)', ['username', `%${filter.searchText}%`]))
            .orWhere(knex.raw('LOWER(??) LIKE LOWER(?)', ['email', `%${filter.searchText}%`]))
            .orWhere(knex.raw('LOWER(??) LIKE LOWER(?)', ['first_name', `%${filter.searchText}%`]))
            .orWhere(knex.raw('LOWER(??) LIKE LOWER(?)', ['last_name', `%${filter.searchText}%`]));
        });
      }
    }

    return camelizeKeys(await queryBuilder);
  }

  public async getUser(id: number) {
    return camelizeKeys(
      await knex
        .select(...userColumnsWithSocial)
        .from('user AS u')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .leftJoin('auth_facebook AS fa', 'fa.user_id', 'u.id')
        .leftJoin('auth_google AS ga', 'ga.user_id', 'u.id')
        .leftJoin('auth_github AS gha', 'gha.user_id', 'u.id')
        .leftJoin('auth_linkedin AS lna', 'lna.user_id', 'u.id')
        .where('u.id', '=', id)
        .first()
    );
  }

  public async getUserWithPassword(id: number) {
    return camelizeKeys(
      await knex
        .select(...userColumnsWithPassword)
        .from('user AS u')
        .where('u.id', '=', id)
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .first()
    );
  }

  public register({ username, email, role = 'user', isActive }: Profile, passwordHash: string | false) {
    return knex('user').insert(decamelizeKeys({ username, email, role, passwordHash, isActive }));
  }

  public createFacebookAuth({ id, displayName, userId }: SocialInterface) {
    return returnId(knex('auth_facebook')).insert({ fb_id: id, display_name: displayName, user_id: userId });
  }

  public createGithubAuth({ id, displayName, userId }: SocialInterface) {
    return returnId(knex('auth_github')).insert({ gh_id: id, display_name: displayName, user_id: userId });
  }

  public createGoogleOAuth({ id, displayName, userId }: SocialInterface) {
    return returnId(knex('auth_google')).insert({ google_id: id, display_name: displayName, user_id: userId });
  }

  public createLinkedInAuth({ id, displayName, userId }: SocialInterface) {
    return returnId(knex('auth_linkedin')).insert({ ln_id: id, display_name: displayName, user_id: userId });
  }

  public editUser({ id, username, email, role, isActive }: Profile, passwordHash: string) {
    const localAuthInput = passwordHash ? { email, passwordHash } : { email };
    return knex('user')
      .update(decamelizeKeys({ username, role, isActive, ...localAuthInput }))
      .where({ id });
  }

  public async isUserProfileExists(userId: number) {
    return !!(await knex('user_profile')
      .count('id as count')
      .where(decamelizeKeys({ userId }))
      .first()).count;
  }

  public editUserProfile({ id, profile }: { id: number; profile: Profile }, isExists?: boolean) {
    if (isExists) {
      return knex('user_profile')
        .update(decamelizeKeys(profile))
        .where({ user_id: id });
    } else {
      return returnId(knex('user_profile')).insert({ ...decamelizeKeys(profile), user_id: id });
    }
  }

  public deleteUser(id: number) {
    return knex('user')
      .where('id', '=', id)
      .del();
  }

  public async updatePassword(id: number, newPassword: string) {
    const passwordHash = await bcrypt.hash(newPassword, 12);

    return knex('user')
      .update({ password_hash: passwordHash })
      .where({ id });
  }

  public updateActive(id: number, isActive: number) {
    return knex('user')
      .update({ is_active: isActive })
      .where({ id });
  }

  public async getUserByEmail(email: string) {
    return camelizeKeys(
      await knex
        .select(...userColumnsWithPassword)
        .from('user AS u')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .where({ email })
        .first()
    );
  }

  public async getUserByFbIdOrEmail(id: number, email: string) {
    return camelizeKeys(
      await knex
        .select(...userColumnsWithPassword, 'fa.fb_id')
        .from('user AS u')
        .leftJoin('auth_facebook AS fa', 'fa.user_id', 'u.id')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .where('fa.fb_id', '=', id)
        .orWhere('u.email', '=', email)
        .first()
    );
  }

  public async getUserByLnInIdOrEmail(id: number, email: string) {
    return camelizeKeys(
      await knex
        .select(...userColumnsWithPassword, 'lna.ln_id')
        .from('user AS u')
        .leftJoin('auth_linkedin AS lna', 'lna.user_id', 'u.id')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .where('lna.ln_id', '=', id)
        .orWhere('u.email', '=', email)
        .first()
    );
  }

  public async getUserByGHIdOrEmail(id: number, email: string) {
    return camelizeKeys(
      await knex
        .select(...userColumnsWithPassword, 'gha.gh_id')
        .from('user AS u')
        .leftJoin('auth_github AS gha', 'gha.user_id', 'u.id')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .where('gha.gh_id', '=', id)
        .orWhere('u.email', '=', email)
        .first()
    );
  }

  public async getUserByGoogleIdOrEmail(id: number, email: string) {
    return camelizeKeys(
      await knex
        .select(...userColumnsWithPassword, 'ga.google_id')
        .from('user AS u')
        .leftJoin('auth_google AS ga', 'ga.user_id', 'u.id')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .where('ga.google_id', '=', id)
        .orWhere('u.email', '=', email)
        .first()
    );
  }

  public async getUserByUsername(username: string) {
    return camelizeKeys(
      await knex
        .select(...userColumns)
        .from('user AS u')
        .where('u.username', '=', username)
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .first()
    );
  }

  public async getUserByUsernameOrEmail(usernameOrEmail: string) {
    return camelizeKeys(
      await knex
        .select(...userColumnsWithPassword)
        .from('user AS u')
        .where('u.username', '=', usernameOrEmail)
        .orWhere('u.email', '=', usernameOrEmail)
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .first()
    );
  }
}
const userDAO = new UserDAO();

export default userDAO;
