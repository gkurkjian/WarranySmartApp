import { Form, Row, Col, Badge } from "react-bootstrap";

export default function FiltersBar({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  count,
}) {
  return (
    <Row className="mb-3 align-items-center">
      <Col md={6} className="mb-2 mb-md-0">
        <Form.Control
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search product or platform…"
        />
      </Col>

      <Col md={4} className="mb-2 mb-md-0">
        <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Form.Select>
      </Col>

      <Col md={2} className="text-md-end">
        <Badge bg="secondary" className="fs-6">
          {count} item{count !== 1 ? "s" : ""}
        </Badge>
      </Col>
    </Row>
  );
}
