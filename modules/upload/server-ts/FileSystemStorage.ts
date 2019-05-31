import fs, { Stats } from 'fs';
import mkdirp from 'mkdirp';
import shortid from 'shortid';

export interface UploadedFile {
  path: string;
  name: string;
  size: number;
  type: string;
}

export interface UploadFileData {
  data: Buffer;
  name: string;
  mimetype: string;
  size: number;
}

/**
 * Class FileSystemStorage provides saving, getting info, deleting the files in the file system.
 */
export class FileSystemStorage {
  public save(uploadFileData: UploadFileData, location: string, shouldGenerateId = true): Promise<UploadedFile> {
    const { data, name, mimetype, size } = uploadFileData;

    const id = shouldGenerateId ? `${shortid.generate()}-` : '';
    const sanitizedFilename = name.replace(/[^a-z0-9_.\-]/gi, '_').toLowerCase();
    const path = `${location}/${id}${sanitizedFilename}`;

    // Check if UPLOAD_DIR exists, create one if not
    if (!fs.existsSync(location)) {
      mkdirp.sync(location);
    }

    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, err => {
        if (err) {
          reject(err);
        }
        resolve({ path, size, name, type: mimetype });
      });
    });
  }

  public delete(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, err => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  }

  public getInfo(filePath: string): Promise<Stats> {
    return new Promise((resolve, reject) => {
      fs.stat(filePath, (err, stats) => {
        if (err) {
          reject(err);
        }

        resolve(stats);
      });
    });
  }
}

export default new FileSystemStorage();
