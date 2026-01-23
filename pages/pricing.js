import Link from "next/link";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

export default function Pricing() {
  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="display-5 fw-bold mb-3">Simple, Transparent Pricing</h1>
          <p className="lead text-muted">Start free, upgrade when you need more</p>
        </Col>
      </Row>

      <Row className="g-4 justify-content-center">
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="p-4 text-center">
              <h4 className="mb-3">Free</h4>
              <div className="display-5 fw-bold mb-3">$0</div>
              <p className="text-muted mb-4">Perfect for personal use</p>
              <ul className="list-unstyled text-start mb-4">
                <li className="mb-2">✓ Up to 50 warranties</li>
                <li className="mb-2">✓ Basic categories</li>
                <li className="mb-2">✓ Expiry alerts</li>
                <li className="mb-2">✓ Mobile access</li>
              </ul>
              <Link href="/signup" passHref legacyBehavior>
                <Button variant="outline-dark" className="w-100">
                  Get Started
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow border-dark">
            <Card.Body className="p-4 text-center">
              <Badge bg="dark" className="mb-2">
                Most Popular
              </Badge>
              <h4 className="mb-3">Pro</h4>
              <div className="display-5 fw-bold mb-3">$9</div>
              <p className="text-muted mb-4">For power users</p>
              <ul className="list-unstyled text-start mb-4">
                <li className="mb-2">✓ Unlimited warranties</li>
                <li className="mb-2">✓ Custom categories</li>
                <li className="mb-2">✓ Receipt uploads</li>
                <li className="mb-2">✓ Priority support</li>
                <li className="mb-2">✓ Advanced filtering</li>
                <li className="mb-2">✓ Export data</li>
              </ul>
              <Link href="/signup" passHref legacyBehavior>
                <Button variant="dark" className="w-100">
                  Start Free Trial
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5 pt-5 text-center">
        <Col>
          <h4 className="mb-3">All plans include:</h4>
          <p className="text-muted">
            Multi-device sync • Secure cloud storage • Regular updates • No ads
          </p>
        </Col>
      </Row>
    </Container>
  );
}
