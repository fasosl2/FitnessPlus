import { Badge, Col, ListGroup as ListGroupBS, Row } from "react-bootstrap";

export const ListGroup = ({ items = [] }) => {
  return (
    <ListGroupBS>
      {items.map((item) => (
        <ListGroupBS.Item>
          <Row>
            <Col xs={8}>{item.title}</Col>
            <Col xs={4} className="text-end">
              <Badge pill>{item.total}</Badge>
            </Col>
          </Row>
        </ListGroupBS.Item>
      ))}
    </ListGroupBS>
  );
};
