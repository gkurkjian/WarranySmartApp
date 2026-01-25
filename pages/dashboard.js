import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Button, Alert, Spinner, Form, InputGroup, Row, Col, Badge, Tabs, Tab } from "react-bootstrap";
import { supabase } from "../lib/supabaseClient";
import { requireAuth } from "../lib/requireAuth";
import WarrantyList from "../components/WarrantyList";
import LocalStorageMigration from "../components/LocalStorageMigration";

function Dashboard() {
  const router = useRouter();
  const [warranties, setWarranties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeTab, setActiveTab] = useState("active");

  // Fetch warranties and categories
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      setError("");

      // Fetch warranties with category names
      const { data: warrantiesData, error: warrantiesError } = await supabase
        .from("warranties")
        .select(`
          id,
          product,
          platform,
          category_id,
          purchase_date,
          expires_at,
          notes,
          created_at,
          categories (
            id,
            name
          )
        `)
        .order("expires_at", { ascending: true });

      if (warrantiesError) throw warrantiesError;

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (categoriesError) throw categoriesError;

      setWarranties(warrantiesData || []);
      setCategories(categoriesData || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this warranty?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("warranties")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setWarranties((prev) => prev.filter((w) => w.id !== id));
    } catch (err) {
      console.error("Error deleting warranty:", err);
      alert("Failed to delete warranty: " + err.message);
    }
  }

  function handleEdit(warranty) {
    router.push(`/warranties/${warranty.id}`);
  }

  // Transform warranties for WarrantyList component
  const transformedWarranties = warranties.map((w) => ({
    id: w.id,
    product: w.product,
    platform: w.platform,
    category: w.categories?.name || "Uncategorized",
    purchaseDate: w.purchase_date,
    expiresAt: w.expires_at,
    notes: w.notes,
  }));

  // Filter warranties
  const filteredWarranties = transformedWarranties.filter((w) => {
    const matchesSearch =
      w.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.platform.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "all" ||
      w.category === selectedCategory;

    const now = new Date();
    const expiresDate = new Date(w.expiresAt + "T00:00:00");
    const isExpired = expiresDate < now;

    const matchesTab =
      (activeTab === "active" && !isExpired) ||
      (activeTab === "expired" && isExpired);

    return matchesSearch && matchesCategory && matchesTab;
  });

  // Calculate stats
  const activeCount = transformedWarranties.filter((w) => {
    const now = new Date();
    const expiresDate = new Date(w.expiresAt + "T00:00:00");
    return expiresDate >= now;
  }).length;

  const expiredCount = transformedWarranties.length - activeCount;

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">My Warranties</h1>
          <div className="d-flex gap-2">
            <Badge bg="success">{activeCount} Active</Badge>
            <Badge bg="danger">{expiredCount} Expired</Badge>
          </div>
        </div>
        <Button
          variant="dark"
          size="lg"
          onClick={() => router.push("/warranties/new")}
        >
          + New Warranty
        </Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* LocalStorage Migration */}
      {warranties.length === 0 && (
        <LocalStorageMigration onComplete={fetchData} />
      )}

      {/* Search and Filter Bar */}
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search warranties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Tabs for Active/Expired */}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="active" title={`Active (${activeCount})`}>
          {filteredWarranties.length === 0 ? (
            <div className="text-center text-muted py-5">
              <p className="mb-3">No active warranties found.</p>
              <Button
                variant="dark"
                onClick={() => router.push("/warranties/new")}
              >
                + Add Your First Warranty
              </Button>
            </div>
          ) : (
            <WarrantyList
              items={filteredWarranties}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </Tab>
        <Tab eventKey="expired" title={`Expired (${expiredCount})`}>
          {filteredWarranties.length === 0 ? (
            <div className="text-center text-muted py-5">
              <p>No expired warranties.</p>
            </div>
          ) : (
            <WarrantyList
              items={filteredWarranties}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </Tab>
      </Tabs>
    </Container>
  );
}

export default requireAuth(Dashboard);
