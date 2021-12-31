import { Order } from 'src/constants';

export const sequence = (tasks) => tasks.reduce((p, c) => p.then(c), Promise.resolve());

export const xy2label = (x, y, order, cols, rows, isInTurn) => {
  switch (order) {
    case Order.LeftRight: {
      if (isInTurn && y % 2) {
        return (y * cols) + (cols - x - 1);
      }
      return (y * cols) + x;
    }

    case Order.RightLeft: {
      if (isInTurn && y % 2) {
        return (y * cols) + x;
      }
      return (y * cols) + (cols - x - 1);
    }

    case Order.TopBottom: {
      if (isInTurn && x % 2) {
        return (x * rows) + (rows - y - 1);
      }
      return (x * rows) + y;
    }

    case Order.BottonTop: {
      if (isInTurn && x % 2) {
        return (x * rows) + y;
      }
      return (x * rows) + (rows - y - 1);
    }

    default:
      return null;
  }
};

export const isExist = (...args) => args.reduce((p, c) => p && (c !== null && c !== undefined), true);
export const isInteger = (value) => /^[+-]?\d+$/.test(value);
