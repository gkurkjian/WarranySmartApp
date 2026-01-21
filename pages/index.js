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
  const [editingId, setEditingId] = useState(null);

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
      // expiring soon first
      .sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt));
  }, [items, search, category]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function resetForm(keepCategory = true) {
    setForm((f) => ({
      product: "",
      platform: "",
      category: keepCategory ? f.category : "Electronics",
      purchaseDate: "",
      expiresAt: "",
      notes: "",
    }));
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      product: item.product || "",
      platform: item.platform || "",
      category: item.category || "Electronics",
      purchaseDate: item.purchaseDate || "",
      expiresAt: item.expiresAt || "",
      notes: item.notes || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    resetForm(true);
  }

  function addItem(e) {
    e.preventDefault();

    // required fields first (so we don't compare invalid dates)
    if (!form.product.trim()) return alert("Product is required.");
    if (!form.platform.trim()) return alert("Platform is required.");
    if (!form.purchaseDate) return alert("Purchase date is required.");
    if (!form.expiresAt) return alert("Expiry date is required.");

    // preventing dumb data
    if (new Date(form.expiresAt) < new Date(form.purchaseDate)) {
      return alert("Expiry date cannot be before purchase date.");
    }

    // EDIT MODE
    if (editingId) {
      setItems((prev) =>
        prev.map((it) =>
          it.id === editingId
            ? {
                ...it,
                product: form.product.trim(),
                platform: form.platform.trim(),
                category: form.category.trim(),
                purchaseDate: form.purchaseDate,
                expiresAt: form.expiresAt,
                notes: form.notes?.trim() || "",
                updatedAt: new Date().toISOString(),
              }
            : it
        )
      );

      setEditingId(null);
      resetForm(true);
      return;
    }

    // ADD MODE
    const newItem = makeItem(form);
    setItems((prev) => [newItem, ...prev]);
    resetForm(true);
  }

  function deleteItem(id) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <div className="bg-white p-4 rounded-4 shadow-sm">
      <main
        style={{
          maxWidth: 900,
          margin: "0 auto",
          fontFamily: "system-ui",
        }}
      >
        <h1 className="mb-1">Warranty Smart App</h1>
        <p className="text-muted mb-4">
          Add warranties, search, filter, and keep them saved locally.
        </p>

        <WarrantyForm
          form={form}
          onChange={handleChange}
          onSubmit={addItem}
          categories={CATEGORIES}
          editing={!!editingId}
          onCancel={cancelEdit}
        />

        <FiltersBar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={CATEGORIES}
          count={filteredItems.length}
        />

        <WarrantyList items={filteredItems} onDelete={deleteItem} onEdit={startEdit} />
      </main>
    </div>
  );
}
