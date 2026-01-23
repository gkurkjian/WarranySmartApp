import { Card, Form, Button, Row, Col } from "react-bootstrap";

export default function WarrantyForm({ form, onChange, onSubmit, categories, editing, onCancel }) {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-3">{editing ? "Edit Warranty" : "Add New Warranty"}</h5>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Product *</Form.Label>
                <Form.Control
                  name="product"
                  value={form.product}
                  onChange={onChange}
                  placeholder="MacBook Pro 14"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Platform *</Form.Label>
                <Form.Control
                  name="platform"
                  value={form.platform}
                  onChange={onChange}
                  placeholder="Apple, Amazon, BestBuy"
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select name="category" value={form.category} onChange={onChange}>
                  {categories.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Purchase Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="purchaseDate"
                  value={form.purchaseDate}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Expires At *</Form.Label>
                <Form.Control
                  type="date"
                  name="expiresAt"
                  value={form.expiresAt}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Notes (optional)</Form.Label>
                <Form.Control
                  name="notes"
                  value={form.notes}
                  onChange={onChange}
                  placeholder="Extra info…"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-2">
            <Button type="submit" variant="dark">
              {editing ? "Save Changes" : "Add Warranty"}
            </Button>

            {editing && (
              <Button type="button" variant="outline-secondary" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
