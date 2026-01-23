import { Container, Card } from "react-bootstrap";

export default function Dashboard() {
  // TODO: In STEP 3, we'll add route protection
  // TODO: In STEP 5, we'll implement the full dashboard

  return (
    <Container className="py-5">
      <h1 className="mb-4">My Dashboard</h1>
      <Card className="shadow-sm">
        <Card.Body className="p-5 text-center text-muted">
          <p>Dashboard will be implemented in STEP 5.</p>
          <p>This page will show your warranties, stats, and quick actions.</p>
        </Card.Body>
      </Card>
    </Container>
  );
}
