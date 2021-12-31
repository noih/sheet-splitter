import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Button, Upload, InputNumber, Radio, Switch, Typography, Checkbox
} from 'antd';
import {
  UploadOutlined, ExportOutlined, BorderHorizontalOutlined, BorderVerticleOutlined,
  ColumnWidthOutlined, ColumnHeightOutlined,
  ArrowRightOutlined, ArrowLeftOutlined, ArrowDownOutlined, ArrowUpOutlined,
  PlaySquareOutlined
} from '@ant-design/icons';

import { Order } from 'src/constants';

import styles from './styles.module.css';

const ActionsBar = (props) => {
  const {
    isExportable, isBusy,

    vGap, hGap,
    onVGapChange, onHGapChange,

    cellWidth, cellHeight,
    onCellWidthChange, onCellHeightChange,

    order, isInTurn,
    onOrderChange, onInTurnChange,

    x, y, width, height,

    interval, onIntervalChange,

    onImport, onExport
  } = props;

  const customRequest = ({ onSuccess, file }) => {
    onImport(file);
    onSuccess();
  };

  return (
    <div className={styles.bar}>
      <div className={styles.group}>
        <Upload
          accept="image/png"
          multiple={false}
          maxCount={1}
          customRequest={customRequest}
          itemRender={() => null}
        >
          <Button icon={<UploadOutlined />} />
        </Upload>

        <Button
          disabled={!isExportable}
          loading={isBusy}
          icon={<ExportOutlined />}
          onClick={onExport}
        />
      </div>


      <div className={styles.group}>
        <InputNumber
          prefix={<ColumnWidthOutlined />}
          value={cellWidth}
          onChange={onCellWidthChange}
        />

        <InputNumber
          prefix={<ColumnHeightOutlined />}
          value={cellHeight}
          onChange={onCellHeightChange}
        />
      </div>


      <div className={styles.group}>
        <InputNumber
          prefix={<BorderHorizontalOutlined />}
          value={hGap}
          onChange={onHGapChange}
        />

        <InputNumber
          prefix={<BorderVerticleOutlined />}
          value={vGap}
          onChange={onVGapChange}
        />
      </div>

      <div className={styles.group}>
        <InputNumber
          prefix={<PlaySquareOutlined />}
          value={interval}
          onChange={onIntervalChange}
        />
      </div>

      <div className={styles.group}>
        <Radio.Group
          buttonStyle="solid"
          value={order}
          onChange={onOrderChange}
        >
          <Radio.Button value={Order.LeftRight}>
            <ArrowRightOutlined />
          </Radio.Button>

          <Radio.Button value={Order.RightLeft}>
            <ArrowLeftOutlined />
          </Radio.Button>

          <Radio.Button value={Order.TopBottom}>
            <ArrowDownOutlined />
          </Radio.Button>

          <Radio.Button value={Order.BottonTop}>
            <ArrowUpOutlined />
          </Radio.Button>
        </Radio.Group>

        <Checkbox
          checked={isInTurn}
          onChange={onInTurnChange}
        />
      </div>

      <div className={clsx(styles.group, styles.coordinate)}>
        <Typography.Text>
          { `(${x}, ${y}) [${width}, ${height}]` }
        </Typography.Text>
      </div>
    </div>
  );
};

ActionsBar.propTypes = {
  isExportable: PropTypes.bool.isRequired,
  isBusy: PropTypes.bool.isRequired,

  vGap: PropTypes.number.isRequired,
  hGap: PropTypes.number.isRequired,
  cellWidth: PropTypes.number.isRequired,
  cellHeight: PropTypes.number.isRequired,
  order: PropTypes.string.isRequired,
  isInTurn: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  interval: PropTypes.number.isRequired,

  onImport: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,

  onVGapChange: PropTypes.func.isRequired,
  onHGapChange: PropTypes.func.isRequired,
  onCellWidthChange: PropTypes.func.isRequired,
  onCellHeightChange: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  onInTurnChange: PropTypes.func.isRequired,
  onIntervalChange: PropTypes.func.isRequired
};

export default ActionsBar;
