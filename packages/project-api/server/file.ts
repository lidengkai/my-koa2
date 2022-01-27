import path from 'path';
import * as result from '~lib/utils/result';
import { saveFile } from '~lib/utils/file';
import random from '~lib/utils/random';
import { File } from 'formidable';

export const upload = async (file: File) => {
  if (file) {
    const filename =
      `${Date.now()}-${random(5)}` + path.extname(file.name || '');
    const res = await saveFile(filename, file);
    if (res) {
      return result.success(res);
    }
  }
  return result.error('文件上传失败');
};
