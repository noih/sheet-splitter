import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import { xy2label } from 'src/utils';

import styles from './styles.module.css';

class Preview extends React.Component {
  constructor() {
    super();

    this.canvasRef = React.createRef();

    this._interval = null;
    this._index = 0;
  }

  componentDidMount() {
    this._interval = setInterval(this.task, this.props.ms);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ms !== this.props.ms) {
      clearInterval(this._interval);
      this._interval = setInterval(this.task, this.props.ms);
    }
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  task = () => {
    try {
      const {
        source,
        x, y, width, height, rows, cols, vGap, hGap,
        order, isInTurn
      } = this.props;

      if (!source || !this.canvasRef.current) {
        return;
      }

      // eslint-disable-next-line no-self-compare
      if (this._index !== this._index) {
        this._index = 0;
      }

      const label = xy2label(
        this._index % cols,
        Math.floor(this._index / cols),
        order,
        cols,
        rows,
        isInTurn
      );

      // clear first
      const context = this.canvasRef.current.getContext('2d');
      context.clearRect(0, 0, width, height);

      const xIdx = label % cols;
      const yIdx = Math.floor(label / cols);

      const left = x + (xIdx * width) + (xIdx * hGap);
      const top = y + (yIdx * height) + (yIdx * vGap);

      context.drawImage(source, left, top, width, height, 0, 0, width, height);
      context.fillStyle = '#ff0000';
      context.font = '12px Arial';
      context.fillText(`${this._index}`, 0, 10);

      // next
      this._index = (this._index + 1) % (rows * cols);
    } catch (err) {
      // nothing
    }
  };

  render() {
    const { width, height } = this.props;

    return (
      <Draggable
        defaultPosition={{
          x: 10,
          y: 150
        }}
        bounds="parent"
      >
        <div className={styles.content}>
          <canvas
            ref={this.canvasRef}
            className={styles.canvas}
            width={width}
            height={height}
          />
        </div>
      </Draggable>
    );
  }
}

Preview.propTypes = {
  source: PropTypes.instanceOf(Element),
  ms: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  vGap: PropTypes.number.isRequired,
  hGap: PropTypes.number.isRequired,
  order: PropTypes.string.isRequired,
  isInTurn: PropTypes.bool.isRequired
};

Preview.defaultProps = {
  source: null
};

export default Preview;
