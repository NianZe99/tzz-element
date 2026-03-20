import { Button, Modal } from '@mariotzz/tzz-element';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Custom Footer</Button>
      <Modal
        title="Custom Footer"
        open={open}
        onCancel={() => setOpen(false)}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setOpen(false)}>
              Submit
            </Button>
          </div>
        }
      >
        <p>Custom footer content.</p>
      </Modal>
    </>
  );
};
