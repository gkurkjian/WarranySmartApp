import Link from "next/link";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function HowItWorks() {
  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="display-5 fw-bold mb-3">How Warranty Keeper Works</h1>
          <p className="lead text-muted">
            Three simple steps to never lose track of your warranties again
          </p>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
                  style={{ width: 50, height: 50, fontSize: 24, fontWeight: "bold" }}
                >
                  1
                </div>
                <h4 className="ms-3 mb-0">Sign Up</h4>
              </div>
              <Card.Text className="text-muted">
                Create your free account in seconds. No credit card required. Start tracking immediately.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
                  style={{ width: 50, height: 50, fontSize: 24, fontWeight: "bold" }}
                >
                  2
                </div>
                <h4 className="ms-3 mb-0">Add Warranties</h4>
              </div>
              <Card.Text className="text-muted">
                Enter product details, purchase date, and expiry date. Upload receipts and documents for safekeeping.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
                  style={{ width: 50, height: 50, fontSize: 24, fontWeight: "bold" }}
                >
                  3
                </div>
                <h4 className="ms-3 mb-0">Stay Organized</h4>
              </div>
              <Card.Text className="text-muted">
                View your warranties in a clean dashboard. Get alerts before they expire. Access from any device.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-5">
              <h3 className="mb-4">Key Features</h3>
              <Row>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <strong>✓ Expiry Tracking</strong>
                      <br />
                      <span className="text-muted">See which warranties are expiring soon</span>
                    </li>
                    <li className="mb-3">
                      <strong>✓ Categories</strong>
                      <br />
                      <span className="text-muted">Organize by Electronics, Appliances, etc.</span>
                    </li>
                    <li className="mb-3">
                      <strong>✓ Search & Filter</strong>
                      <br />
                      <span className="text-muted">Find any warranty instantly</span>
                    </li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <strong>✓ Receipt Storage</strong>
                      <br />
                      <span className="text-muted">Upload and store receipts securely</span>
                    </li>
                    <li className="mb-3">
                      <strong>✓ Multi-Device Sync</strong>
                      <br />
                      <span className="text-muted">Access from phone, tablet, or computer</span>
                    </li>
                    <li className="mb-3">
                      <strong>✓ Export Data</strong>
                      <br />
                      <span className="text-muted">Download your data anytime</span>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="text-center">
        <Col>
          <h3 className="mb-3">Ready to Get Started?</h3>
          <Link href="/signup" passHref legacyBehavior>
            <Button variant="dark" size="lg">
              Create Your Free Account
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
