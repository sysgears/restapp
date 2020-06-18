import { knex } from '@restapp/database-server-ts';

interface File {
  name: string;
  type: string;
  path: string;
  size: number;
}

class UploadDAO {
  public getFiles() {
    return knex('upload').select('*');
  }

  public getFileById(id: number) {
    return knex('upload')
      .select('*')
      .where({ id })
      .first();
  }

  public saveFiles(files: File[]) {
    return knex('upload').insert(files);
  }

  public deleteFileById(id: number) {
    return knex('upload')
      .where({ id })
      .del();
  }
}

const uploadDAO = new UploadDAO();

export default uploadDAO;
