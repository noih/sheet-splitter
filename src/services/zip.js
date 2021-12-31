import * as zip from '@zip.js/zip.js';
import { saveAs } from 'file-saver';

import { sequence } from 'src/utils';

export default class ZipService {
  /**
   *
   * @param {string} filename
   * @param {object[]} files [{ name, blob }]
   */
  static async create(filename, files = []) {
    const blobWriter = new zip.BlobWriter('application/zip');
    const writer = new zip.ZipWriter(blobWriter, {
      useWebWorkers: true,
      level: 1
    });

    await sequence(
      files.map((f) => () => writer.add(f.name, new zip.BlobReader(f.blob)))
    );

    await writer.close();

    saveAs(
      new Blob([blobWriter.getData()], { type: 'application/zip' }),
      filename
    );
  }
}
