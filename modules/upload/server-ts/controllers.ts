import fileSystemStorage from './FileSystemStorage';
import settings from '../../../settings';
import uploadDAO from './sql';

export const uploadFiles = async ({ files }: any, res: any) => {
  const {
    locals: { t }
  } = res;

  if (!files || !files.fileInput) {
    return res.status(422).send({
      errors: {
        message: t('upload:fileNotAttached')
      }
    });
  }

  const { fileInput } = files;

  const filesArray = Array.isArray(fileInput) ? fileInput : [fileInput];

  try {
    // load files to fs
    const uploadedFiles = await Promise.all(
      filesArray.map(async uploadFile => fileSystemStorage.save(uploadFile, settings.upload.uploadDir))
    );

    // save files data into DB
    await uploadDAO.saveFiles(uploadedFiles);
    res.send(true);
  } catch (e) {
    res.status(500).json({
      errors: {
        message: t('upload:fileNotLoaded'),
        error: e
      }
    });
  }
};

export const getFiles = async (req: any, res: any) => {
  res.json(await uploadDAO.getFiles());
};

export const removeFile = async ({ body: { id } }: any, res: any) => {
  const file = await uploadDAO.getFileById(id);
  const {
    locals: { t }
  } = res;

  if (!file || !(await uploadDAO.deleteFileById(id))) {
    return res.status(422).json({
      errors: {
        message: t('upload:fileNotFound')
      }
    });
  }

  try {
    await fileSystemStorage.delete(file.path);
  } catch (e) {
    return res.status(500).json({
      errors: {
        message: t('upload:fileNotFound'),
        error: e
      }
    });
  }

  res.send(true);
};
