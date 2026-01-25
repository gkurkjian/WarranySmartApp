import { useState } from "react";
import { Container, Card, Button, Alert, ListGroup, Badge, Spinner } from "react-bootstrap";

export default function VerifySetup() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function runVerification() {
    setLoading(true);
    try {
      const response = await fetch("/api/verify-db");
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({
        success: false,
        message: "Failed to connect to API",
        error: err.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="py-5">
      <Card className="shadow-sm">
        <Card.Body className="p-5">
          <h1 className="mb-4">🔍 Database Setup Verification</h1>

          <Alert variant="info">
            <strong>Having issues?</strong> Use this tool to verify your database is properly set up.
          </Alert>

          <div className="text-center mb-4">
            <Button
              variant="dark"
              size="lg"
              onClick={runVerification}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Checking...
                </>
              ) : (
                "Run Verification"
              )}
            </Button>
          </div>

          {result && (
            <>
              <Alert variant={result.success ? "success" : "danger"}>
                <h5>{result.message}</h5>
              </Alert>

              {result.details && (
                <Card className="mb-3">
                  <Card.Header>
                    <strong>Detailed Results</strong>
                  </Card.Header>
                  <ListGroup variant="flush">
                    {Object.entries(result.details).map(([key, value]) => (
                      <ListGroup.Item key={key}>
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong>
                            <pre className="mb-0 mt-2" style={{ whiteSpace: "pre-wrap" }}>
                              {value}
                            </pre>
                          </div>
                          <Badge bg={value.includes("✅") ? "success" : "danger"}>
                            {value.includes("✅") ? "PASS" : "FAIL"}
                          </Badge>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              )}

              {result.next_steps && (
                <Card className="bg-light">
                  <Card.Body>
                    <h5 className="mb-3">📋 Next Steps:</h5>
                    <ol className="mb-0">
                      {result.next_steps.map((step, idx) => (
                        <li key={idx} className="mb-2">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </Card.Body>
                </Card>
              )}

              {result.error && (
                <Alert variant="danger" className="mt-3">
                  <strong>Error Details:</strong>
                  <pre className="mb-0 mt-2">{result.error}</pre>
                </Alert>
              )}
            </>
          )}

          <hr className="my-4" />

          <div className="text-muted small">
            <h6>Common Issues:</h6>
            <ul>
              <li>
                <strong>"Could not find table"</strong> - You need to run{" "}
                <code>database-schema.sql</code> in Supabase SQL Editor
              </li>
              <li>
                <strong>"Missing environment variables"</strong> - Check your{" "}
                <code>.env.local</code> file
              </li>
              <li>
                <strong>"Authentication failed"</strong> - Make sure email auth is
                enabled in Supabase
              </li>
            </ul>

            <p className="mb-0">
              <strong>See detailed instructions:</strong>{" "}
              <code>DATABASE_SETUP_INSTRUCTIONS.md</code>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
