import { Button } from '@mariotzz/tzz-element';

const PlusIcon = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M482 152h60c8.8 0 16 7.2 16 16v288h288c8.8 0 16 7.2 16 16v60c0 8.8-7.2 16-16 16H558v288c0 8.8-7.2 16-16 16h-60c-8.8 0-16-7.2-16-16V548H178c-8.8 0-16-7.2-16-16v-60c0-8.8 7.2-16 16-16h288V168c0-8.8 7.2-16 16-16z" />
  </svg>
);

export default () => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <Button
      type="primary"
      shape="circle"
      icon={<PlusIcon />}
      aria-label="Add"
    />
    <Button type="primary" shape="round">
      Round
    </Button>
    <Button type="primary">Default</Button>
  </div>
);
