import { Select } from '@mariotzz/tzz-element';

const options = [
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
  { label: 'Yellow', value: 'yellow' },
];

export default () => (
  <div style={{ maxWidth: 360 }}>
    <Select
      mode="multiple"
      options={options}
      placeholder="Select colors"
      defaultValue={['red', 'blue']}
    />
  </div>
);
