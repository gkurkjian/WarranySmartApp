import Link from "next/link";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

export default function Home() {
  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 fw-bold mb-3">
            Never Lose Track of Your Warranties Again
          </h1>
          <p className="lead text-muted mb-4">
            Keep all your product warranties organized in one place. Get alerts before they expire.
            Access from anywhere, anytime.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link href="/signup" passHref legacyBehavior>
              <Button variant="dark" size="lg">
                Get Started Free
              </Button>
            </Link>
            <Link href="/how-it-works" passHref legacyBehavior>
              <Button variant="outline-dark" size="lg">
                How It Works
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="mt-5 g-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center p-4">
              <div className="fs-1 mb-3">📦</div>
              <Card.Title>Track Everything</Card.Title>
              <Card.Text className="text-muted">
                Add warranties for electronics, appliances, furniture, and more. Never forget what's covered.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center p-4">
              <div className="fs-1 mb-3">🔔</div>
              <Card.Title>Expiry Alerts</Card.Title>
              <Card.Text className="text-muted">
                Get notified before your warranties expire. Don't miss out on free repairs or replacements.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center p-4">
              <div className="fs-1 mb-3">📱</div>
              <Card.Title>Access Anywhere</Card.Title>
              <Card.Text className="text-muted">
                Your warranties synced across all devices. Access receipts and details whenever you need them.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CTA Section */}
      <Row className="mt-5 py-5 text-center bg-light rounded">
        <Col>
          <h2 className="mb-3">Ready to Get Organized?</h2>
          <p className="text-muted mb-4">Join thousands of users tracking their warranties effortlessly.</p>
          <Link href="/signup" passHref legacyBehavior>
            <Button variant="dark" size="lg">
              Start Tracking Now
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
