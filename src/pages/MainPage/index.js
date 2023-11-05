import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import ScrollContainer from 'react-indiana-drag-scroll';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import withRouter from 'src/components/withRouter';
import ActionsBar from 'src/components/ActionsBar';
import RndBox from 'src/components/RndBox';
import GridView from 'src/components/GridView';
import Preview from 'src/components/Preview';
import ExportModal from 'src/components/ExportModal';

import MainPageViewModel from './viewModels';
import styles from './styles.module.css';

@observer
class MainPage extends React.Component {
  constructor() {
    super();

    this.vm = new MainPageViewModel(this.props);
  }

  componentDidMount() {
    this.vm.didMount(this.props);
  }

  componentDidUpdate(prevProps) {
    this.vm.didUpdate(prevProps, this.props);
  }

  componentWillUnmount() {
    this.vm.willUnmount(this.props);
  }

  customRequest = ({ onSuccess, file }) => {
    this.vm.onFileChange(file);
    onSuccess();
  };

  render() {
    return (
      <div className={styles.page}>
        <ActionsBar
          isExportable={this.vm.exportable}
          isBusy={this.vm.exporting}
          onImport={this.vm.onImport}
          onExport={this.vm.onExport}
          vGap={this.vm.vGap}
          hGap={this.vm.hGap}
          onVGapChange={this.vm.onVGapChange}
          onHGapChange={this.vm.onHGapChange}
          cellWidth={this.vm.cellWidth}
          cellHeight={this.vm.cellHeight}
          onCellWidthChange={this.vm.onCellWidthChange}
          onCellHeightChange={this.vm.onCellHeightChange}
          order={this.vm.order}
          isInTurn={this.vm.isInTurn}
          onOrderChange={this.vm.onOrderChange}
          onInTurnChange={this.vm.onInTurnChange}
          x={this.vm.x}
          y={this.vm.y}
          width={this.vm.boxWidth}
          height={this.vm.boxHeight}
          interval={this.vm.interval}
          onIntervalChange={this.vm.onIntervalChange}
        />

        <ScrollContainer
          className={styles.wrapper}
          ignoreElements={['.grid-box']}
        >
          <canvas
            width={this.vm.width}
            height={this.vm.height}
            ref={this.vm.canvasRef}
            className={styles.canvas}
          />
          {
            this.vm.file ? (
              <RndBox
                className="grid-box"
                x={this.vm.x}
                y={this.vm.y}
                width={this.vm.boxWidth}
                height={this.vm.boxHeight}
                onResize={this.vm.onBoxResize}
                onDrag={this.vm.onBoxDrag}
              >
                <GridView
                  width={this.vm.cellWidth}
                  height={this.vm.cellHeight}
                  rows={this.vm.rows}
                  cols={this.vm.cols}
                  vGap={this.vm.vGap}
                  hGap={this.vm.hGap}
                  order={this.vm.order}
                  isInTurn={this.vm.isInTurn}
                />
              </RndBox>
            ) : null
          }
        </ScrollContainer>

        {
          this.vm.file ? (
            <Preview
              source={this.vm.canvasRef.current}
              ms={this.vm.interval}
              x={this.vm.x}
              y={this.vm.y}
              width={this.vm.cellWidth}
              height={this.vm.cellHeight}
              rows={this.vm.rows}
              cols={this.vm.cols}
              vGap={this.vm.vGap}
              hGap={this.vm.hGap}
              order={this.vm.order}
              isInTurn={this.vm.isInTurn}
            />
          ) : null
        }

        <KeyboardEventHandler
          handleKeys={['up', 'down', 'left', 'right', 'w', 's', 'a', 'd']}
          handleEventType="keydown"
          onKeyEvent={this.vm.onKeyEvent}
        />

        <ExportModal
          visible={!!this.vm.exportModal}
          initialValues={this.vm.initialValues}
          onCancel={this.vm.onExportModalClose}
          onFinish={this.vm.onExportModalFinish}
        />
      </div>
    );
  }
}

MainPage.propTypes = {
  context: PropTypes.shape({
    state: PropTypes.object,
    actions: PropTypes.object
  }).isRequired
};

export default withRouter(MainPage);
