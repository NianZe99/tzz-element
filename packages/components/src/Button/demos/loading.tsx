import { Button } from '@mariotzz/tzz-element';
import { useState } from 'react';

export default () => {
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button type="primary" loading>
        Loading
      </Button>
      <Button type="primary" loading={{ delay: 500 }} onClick={() => {}}>
        Delay Loading
      </Button>
      <Button
        type="primary"
        loading={loading}
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 2000);
        }}
      >
        Click to Load
      </Button>
    </div>
  );
};
