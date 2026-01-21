import { useEffect, useMemo, useState } from "react";
import WarrantyForm from "../components/WarrantyForm";
import FiltersBar from "../components/FiltersBar";
import WarrantyList from "../components/WarrantyList";

const STORAGE_KEY = "warranty_items_v1";
const CATEGORIES = ["All", "Electronics", "Appliances", "Furniture", "Automotive", "Other"];

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

  useEffect(() => {
    setItems(loadItems());
  }, []);

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
      .sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt));
  }, [items, search, category]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function addItem(e) {
    e.preventDefault();

    if (!form.product.trim()) return alert("Product is required.");
    if (!form.platform.trim()) return alert("Platform is required.");
    if (!form.purchaseDate) return alert("Purchase date is required.");
    if (!form.expiresAt) return alert("Expiry date is required.");

    const newItem = makeItem(form);
    setItems((prev) => [newItem, ...prev]);

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
    <div bg-white p-4 rounded-4 shadow-sm>
      <main style={{ maxWidth: 900, margin: "0 auto", padding: 16, fontFamily: "system-ui" }}>
        <h1 style={{ marginBottom: 8 }}>Warranty Smart App (MVP)</h1>
        <p style={{ marginTop: 0, opacity: 0.75 }}>
          Add warranties, search, filter, and keep them saved locally.
        </p>

        <WarrantyForm form={form} onChange={handleChange} onSubmit={addItem} categories={CATEGORIES} />

        <FiltersBar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={CATEGORIES}
          count={filteredItems.length}
        />

        <WarrantyList items={filteredItems} onDelete={deleteItem} />
      </main>
    </div>
  );
}
