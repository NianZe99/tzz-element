import { Button, Modal } from '@mariotzz/tzz-element';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Async Close
      </Button>
      <Modal
        title="Async Close"
        open={open}
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
      >
        <p>Click OK and wait 2 seconds to close.</p>
      </Modal>
    </>
  );
};
