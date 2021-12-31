import PropTypes from 'prop-types';

import { xy2label, isExist } from 'src/utils';

import styles from './styles.module.css';

const GridView = (props) => {
  const {
    width, height, rows, cols, vGap, hGap, order, isInTurn
  } = props;

  if (!isExist(width, height, rows, cols, vGap, hGap)) {
    return null;
  }

  return (
    <div className={styles.view}>
      {
        Array.from({ length: cols * rows }, (_, idx) => {
          const x = idx % cols;
          const y = Math.floor(idx / cols);

          const left = (x * width) + (x * hGap);
          const top = (y * height) + (y * vGap);

          return (
            <div
              key={idx}
              className={styles.cell}
              style={{
                left: `${left}px`,
                top: `${top}px`,
                width,
                height
              }}
            >
              <div className={styles.label}>
                { xy2label(x, y, order, cols, rows, isInTurn) }
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

GridView.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  vGap: PropTypes.number.isRequired,
  hGap: PropTypes.number.isRequired,
  order: PropTypes.string.isRequired,
  isInTurn: PropTypes.bool.isRequired
};

export default GridView;
