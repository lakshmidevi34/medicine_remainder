import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

function MedicineList({ medicines, onDelete }) {
  if (!medicines.length) return <p className="text-center">No medicines added yet.</p>;

  return (
    <Row className="g-3">
      {medicines.map((m) => (
        <Col md={4} key={m._id}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>{m.name}</Card.Title>
              <Card.Text>
                <strong>Dosage:</strong> {m.dosage}<br />
                <strong>Time:</strong> {m.time}
              </Card.Text>
              <Button variant="danger" onClick={() => onDelete(m._id, m.name)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default MedicineList;
