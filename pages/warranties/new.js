import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Card, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { supabase } from "../../lib/supabaseClient";
import { requireAuth } from "../../lib/requireAuth";

function NewWarranty() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [product, setProduct] = useState("");
  const [platform, setPlatform] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const warrantyData = {
        user_id: userData.user.id,
        product,
        platform,
        category_id: categoryId || null,
        purchase_date: purchaseDate,
        expires_at: expiresAt,
        notes: notes || null,
      };

      const { error } = await supabase
        .from("warranties")
        .insert([warrantyData]);

      if (error) throw error;

      router.push("/dashboard");
    } catch (err) {
      console.error("Error creating warranty:", err);
      setError(err.message || "Failed to create warranty");
      setLoading(false);
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="mb-4">Add New Warranty</h2>

              {error && (
                <Alert variant="danger" dismissible onClose={() => setError("")}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., iPhone 15 Pro"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Platform/Store *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Apple Store, Amazon, Best Buy"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">Select a category (optional)</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    Manage categories on the{" "}
                    <a href="/categories" className="text-dark">
                      Categories page
                    </a>
                  </Form.Text>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Purchase Date *</Form.Label>
                      <Form.Control
                        type="date"
                        value={purchaseDate}
                        onChange={(e) => setPurchaseDate(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry Date *</Form.Label>
                      <Form.Control
                        type="date"
                        value={expiresAt}
                        onChange={(e) => setExpiresAt(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Any additional details..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button
                    type="submit"
                    variant="dark"
                    className="flex-grow-1"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Warranty"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => router.push("/dashboard")}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default requireAuth(NewWarranty);
