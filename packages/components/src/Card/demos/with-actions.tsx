import { Card } from '@mariotzz/tzz-element';

export default () => (
  <Card
    title="Card with Actions"
    style={{ width: 300 }}
    actions={[
      <span key="edit">Edit</span>,
      <span key="delete">Delete</span>,
      <span key="more">...</span>,
    ]}
  >
    <Card.Meta
      title="Card Title"
      description="This is the description of the card."
    />
  </Card>
);
