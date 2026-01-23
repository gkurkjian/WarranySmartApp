import { Container, Card } from "react-bootstrap";

export default function Categories() {
  // TODO: In STEP 3, we'll add route protection
  // TODO: In STEP 7, we'll implement full category management

  return (
    <Container className="py-5">
      <h1 className="mb-4">Categories</h1>
      <Card className="shadow-sm">
        <Card.Body className="p-5 text-center text-muted">
          <p>Category management will be implemented in STEP 7.</p>
          <p>This page will let you add, edit, and delete custom categories.</p>
        </Card.Body>
      </Card>
    </Container>
  );
}
