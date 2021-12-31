import PropTypes from 'prop-types';
import { Modal, Form, Input, Button } from 'antd';

const ExportModal = (props) => {
  const {
    visible, onCancel,
    initialValues, onFinish
  } = props;

  return (
    <Modal
      closable={false}
      maskClosable
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item
          label="Prefix name"
          name="prefix"
          rules={[
            {
              required: false,
              validator: (_, value) => /^[a-zA-Z0-9_-]{0,50}$/.test(value) ? Promise.resolve() : Promise.reject()
            }
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Ok
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

ExportModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  initialValues: PropTypes.object,

  onCancel: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired
};

ExportModal.defaultProps = {
  initialValues: null
};

export default ExportModal;
