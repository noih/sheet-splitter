import { initializeImageMagick, ImageMagick } from '@imagemagick/magick-wasm';
import { MagickFormat } from '@imagemagick/magick-wasm/magick-format';
import { MagickGeometry } from '@imagemagick/magick-wasm/magick-geometry';
import { Quantum } from '@imagemagick/magick-wasm/quantum';
import { Magick } from '@imagemagick/magick-wasm/magick';

export const Format = MagickFormat;

export default class MagickService {
  static init() {
    return initializeImageMagick();
  }

  static version() {
    return Magick.imageMagickVersion;
  }

  static features() {
    return Magick.features;
  }

  static delegates() {
    return Magick.delegates;
  }

  static depth() {
    return Quantum.depth;
  }

  static read(file) {
    return async (fn) => {
      const buffer = await file.arrayBuffer();
      ImageMagick.read(new Uint8Array(buffer), async (image) => fn(image));
    };
  }

  static crop(image, x, y, w, h) {
    image.extent(new MagickGeometry(x, y, w, h));
  }
}
