import { Card } from '@mariotzz/tzz-element';

export default () => (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://picsum.photos/240/160" />}
  >
    <Card.Meta title="Europe Street beat" description="www.example.com" />
  </Card>
);
