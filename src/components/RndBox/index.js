import React from 'react';
import PropTypes from 'prop-types';
import { Resizable } from 'react-resizable';
import Draggable from 'react-draggable';

import 'react-resizable/css/styles.css';

import styles from './styles.module.css';

const RndBox = (props) => {
  const {
    className,
    onResize, onDrag,

    x, y,
    right, bottom,
    width, height,

    children
  } = props;

  return (
    <div className={className}>
      <Draggable
        position={{ x, y }}
        onDrag={onDrag}
        cancel=".react-resizable-handle"
        bounds={{
          left: 0,
          top: 0,
          right,
          bottom
        }}
      >
        <Resizable
          width={width}
          height={height}
          onResize={onResize}
        >
          <div
            className={styles.box}
            style={{ width, height }}
          >
            { children }
          </div>
        </Resizable>
      </Draggable>
    </div>
  );
};


RndBox.propTypes = {
  className: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  bottom: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onResize: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

RndBox.defaultProps = {
  className: null,
  children: null
};

export default RndBox;
