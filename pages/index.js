import { useEffect, useMemo, useState } from "react";
import { Container, Card } from "react-bootstrap";

const STORAGE_KEY = "warranty_items_v1";

const CATEGORIES = ["All", "Electronics", "Appliances", "Furniture", "Automotive", "Other"];

function daysLeft(expiresAt) {
  // expiresAt expected "YYYY-MM-DD"
  const end = new Date(expiresAt + "T00:00:00");
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function makeItem({ product, platform, category, purchaseDate, expiresAt, notes }) {
  return {
    id: crypto.randomUUID(),
    product: product.trim(),
    platform: platform.trim(),
    category: category.trim(),
    purchaseDate,
    expiresAt,
    notes: notes?.trim() || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function loadItems() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [form, setForm] = useState({
    product: "",
    platform: "",
    category: "Electronics",
    purchaseDate: "",
    expiresAt: "",
    notes: "",
  });

  // load once
  useEffect(() => {
    setItems(loadItems());
  }, []);

  // save on change
  useEffect(() => {
    if (typeof window !== "undefined") saveItems(items);
  }, [items]);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();

    return [...items]
      .filter((it) => (category === "All" ? true : it.category === category))
      .filter((it) => {
        if (!q) return true;
        const hay = `${it.product} ${it.platform}`.toLowerCase();
        return hay.includes(q);
      })
      // sort: expiring soon first
      .sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt));
  }, [items, search, category]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function addItem(e) {
    e.preventDefault();

    // basic validation
    if (!form.product.trim()) return alert("Product is required.");
    if (!form.platform.trim()) return alert("Platform is required.");
    if (!form.purchaseDate) return alert("Purchase date is required.");
    if (!form.expiresAt) return alert("Expiry date is required.");

    const newItem = makeItem(form);
    setItems((prev) => [newItem, ...prev]);

    // reset (keep category default)
    setForm((f) => ({
      product: "",
      platform: "",
      category: f.category,
      purchaseDate: "",
      expiresAt: "",
      notes: "",
    }));
  }

  function deleteItem(id) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <Container className="py-4">
      <h1 className="my-4">WarrantySmart</h1>

      <Card bg="dark" text="light" className="p-4 border-secondary">
        <Card.Body>
          <h2>Add New Item</h2>
          <form onSubmit={addItem}>
            <div className="mb-3">
              <label htmlFor="product" className="form-label">Product</label>
              <input
                type="text"
                id="product"
                name="product"
                value={form.product}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="platform" className="form-label">Platform</label>
              <input
                type="text"
                id="platform"
                name="platform"
                value={form.platform}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                style={inputStyle}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="purchaseDate" className="form-label">Purchase Date</label>
              <input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                value={form.purchaseDate}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="expiresAt" className="form-label">Expires At</label>
              <input
                type="date"
                id="expiresAt"
                name="expiresAt"
                value={form.expiresAt}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="notes" className="form-label">Notes (Optional)</label>
              <textarea
                id={"notes"}
                name={"notes"}
                value={form.notes}
				onChange={handleChange}
				style={{ ...inputStyle, height: 100 }}
			/>
            </div>

            <button type={"submit"} style={{ ...buttonStyle, width: "100%" }}>
              Add Item
            </button>
          </form>
        </Card.Body>
      </Card>

      {/* Search and Filter */}
      {/* Search and Filter */}
      {/* Search and Filter */}
      {/* Search and Filter */}
      {/* Search and Filter */}
      {/* Search and Filter */}
      {/* Search and Filter */}
      {/* Search and Filter */}
      {/* Search and Filter */}
      {/* Search and Filter */}

    </Container>
    
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  marginTop: 6,
  outline: "none",
};

const buttonStyle = {
  marginTop: 12,
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #111",
  background: "#111",
  color: "white",
  cursor: "pointer",
};

const dangerStyle = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid #c00",
  background: "white",
  color: "#c00",
  cursor: "pointer",
  height: 38,
  alignSelf: "start",
};
