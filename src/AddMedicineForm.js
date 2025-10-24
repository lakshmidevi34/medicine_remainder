import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

function AddMedicineForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', dosage: '', time: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.dosage && form.time) {
      onAdd(form);
      setForm({ name: '', dosage: '', time: '' });
    }
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-2">
            <Col md={4}>
              <Form.Control
                name="name"
                placeholder="Medicine Name"
                value={form.name}
                onChange={handleChange}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                name="dosage"
                placeholder="Dosage (e.g. 500mg)"
                value={form.dosage}
                onChange={handleChange}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                name="time"
                placeholder="Time (e.g. 8:00 AM)"
                value={form.time}
                onChange={handleChange}
              />
            </Col>
            <Col md={2}>
              <Button type="submit" variant="primary" className="w-100">
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddMedicineForm;
