import React from 'react';
import {
  makeObservable, observable, computed, action, runInAction
} from 'mobx';

import ZipService from 'src/services/zip';
import MagickService, { Format } from 'src/services/magick';
import { Order } from 'src/constants';
import { xy2label, isInteger } from 'src/utils';

export default class MainPageViewModel {
  canvasRef = React.createRef();

  @observable initialed = false;
  @observable exporting = false;

  @observable file = null;

  @observable x = 0;
  @observable y = 0;

  @observable width = 0;
  @observable height = 0;

  @observable boxWidth = 96;
  @observable boxHeight = 96;

  @observable cellWidth = 32;
  @observable cellHeight = 32;

  @observable vGap = 0;
  @observable hGap = 0;

  @observable order = Order.LeftRight;
  @observable isInTurn = false;

  @observable interval = 200; // ms

  @observable exportModal = null;
  @observable prefix = '';

  constructor(props) {
    makeObservable(this);
  }

  @computed get cols() {
    return Math.floor((this.boxWidth + this.hGap) / ((this.cellWidth + this.hGap) || 1));
  }

  @computed get rows() {
    return Math.floor((this.boxHeight + this.vGap) / ((this.cellHeight + this.vGap) || 1));
  }

  @computed get exportable() {
    return this.file && this.initialed && !this.exporting;
  }

  @computed get initialValues() {
    return {
      prefix: this.prefix
    };
  }

  @action
  didMount = async (props) => {
    console.log('MainPage.didMount, params', props.router.params);
    try {
      await MagickService.init();

      runInAction(() => {
        this.initialed = true;
      });
    } catch (err) {
      console.log('MainPage.didMount');
    }
  };

  didUpdate = (prevProps, props) => {

  };

  willUnmount = (props) => {
    console.log('MainPage.willUnmount');
  };

  @action
  onImport = (file) => {
    this.file = file;

    const image = new Image();
    image.onload = () => {
      const canvas = this.canvasRef.current;

      runInAction(() => {
        this.width = image.width;
        this.height = image.height;
      });

      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
    };

    const reader = new FileReader();
    reader.onload = () => {
      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  };

  @action
  onExport = async () => {
    if (!this.file || !this.initialed || this.exporting) { return; }

    this.exporting = true;

    try {
      const fields = await this.showExportModal();

      await new Promise((resolve) => {
        requestAnimationFrame(async () => {
          await this.genZip(fields);
          resolve();
        });
      });
    } catch (err) {
      // nothing

    } finally {
      runInAction(() => {
        this.exporting = false;
      });
    }
  };

  genZip = async (fields) => {
    try {
      const files = [];

      await MagickService.read(this.file)((image) => {
        try {
          const { prefix } = fields;

          for (let idx = 0; idx < this.cols * this.rows; idx += 1) {
            image.clone((clone) => {
              const label = xy2label(
                idx % this.cols,
                Math.floor(idx / this.cols),
                this.order,
                this.cols,
                this.rows,
                this.isInTurn
              );

              const x = label % this.cols;
              const y = Math.floor(label / this.cols);

              MagickService.crop(
                clone,
                this.x + (x * this.cellWidth) + (x * this.hGap),
                this.y + (y * this.cellHeight) + (y * this.vGap),
                this.cellWidth,
                this.cellHeight
              );

              clone.write(
                (data) => {
                  files.push({
                    name: prefix.length ? `${prefix}-${idx}.png` : `${idx}.png`,
                    blob: new Blob([data], { type: this.file.type })
                  });
                },
                Format.Png8
              );
            });
          }
        } catch (err) {
          console.log('err', err);
        }
      });

      await ZipService.create('archive.zip', files);

    } catch (err) {
      console.log('MainPage.genZip', err);

    }
  };

  @action
  onBoxResize = (ev, data) => {
    this.boxWidth = data.size.width;
    this.boxHeight = data.size.height;
  };

  @action
  onBoxDrag = (ev, data) => {
    this.x = data.x;
    this.y = data.y;
  };

  @action
  onVGapChange = (v) => {
    this.vGap = isInteger(v) ? v : this.vGap;
  };

  @action
  onHGapChange = (v) => {
    this.hGap = isInteger(v) ? v : this.hGap;
  };

  @action
  onCellWidthChange = (v) => {
    this.cellWidth = isInteger(v) ? v : this.cellWidth;
  };

  @action
  onCellHeightChange = (v) => {
    this.cellHeight = isInteger(v) ? v : this.cellHeight;
  };

  @action
  onIntervalChange = (v) => {
    this.interval = /^\d+$/.test(v) ? Math.max(50, v) : 50;
  };

  @action
  onOrderChange = (ev) => {
    this.order = ev.target.value;
  };

  @action
  onInTurnChange = () => {
    this.isInTurn = !this.isInTurn;
  };

  @action
  onPrefixChange = (v) => {
    this.prefix = v;
  };

  @action
  showExportModal = () => {
    return new Promise((resolve, reject) => {
      runInAction(() => {
        this.exportModal = {
          resolve,
          reject
        };
      });
    });
  };

  @action
  onExportModalFinish = (values) => {
    this.exportModal?.resolve?.(values);
    this.exportModal = null;
  };

  @action
  onExportModalClose = () => {
    this.exportModal?.reject?.(new Error('cancel'));
    this.exportModal = null;
  };

  @action
  onKeyEvent = (key, ev) => {
    ev.preventDefault();

    switch (key) {
      case 'up':
      case 'w': {
        this.y = Math.max(0, this.y - 1);
        break;
      }

      case 'down':
      case 's': {
        this.y = Math.min(this.height, this.y + 1);
        break;
      }

      case 'left':
      case 'a': {
        this.x = Math.max(0, this.x - 1);
        break;
      }

      case 'right':
      case 'd': {
        this.x = Math.min(this.width, this.x + 1);
        break;
      }

      default:
        // nothing
    }
  };
}
