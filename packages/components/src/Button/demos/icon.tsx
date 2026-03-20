import { Button } from '@mariotzz/tzz-element';

const SearchIcon = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M909.6 854.5L649.9 594.8C690.2 542.7 714 478.4 714 408c0-167.6-136.4-304-304-304S106 240.4 106 408s136.4 304 304 304c70.4 0 134.7-23.8 186.8-64.1l259.7 259.6a8.2 8.2 0 0011.6 0l47.5-47.5a8.2 8.2 0 000-11.5zM410 676c-150.1 0-272-121.9-272-272s121.9-272 272-272 272 121.9 272 272-121.9 272-272 272z" />
  </svg>
);

export default () => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <Button type="primary" icon={<SearchIcon />}>
      Search
    </Button>
    <Button
      type="primary"
      shape="circle"
      icon={<SearchIcon />}
      aria-label="Search"
    />
    <Button type="primary" icon={<SearchIcon />} iconPlacement="end">
      Search
    </Button>
  </div>
);
