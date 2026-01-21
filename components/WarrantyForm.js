export default function WarrantyForm({ form, onChange, onSubmit, categories }) {
  return (
    <form onSubmit={onSubmit} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
        <label>
          Product *
          <input
            name="product"
            value={form.product}
            onChange={onChange}
            placeholder="MacBook Pro 14"
            style={inputStyle}
          />
        </label>

        <label>
          Platform *
          <input
            name="platform"
            value={form.platform}
            onChange={onChange}
            placeholder="Apple, Amazon, BestBuy"
            style={inputStyle}
          />
        </label>

        <label>
          Category
          <select name="category" value={form.category} onChange={onChange} style={inputStyle}>
            {categories.filter((c) => c !== "All").map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label>
          Purchase Date *
          <input
            type="date"
            name="purchaseDate"
            value={form.purchaseDate}
            onChange={onChange}
            style={inputStyle}
          />
        </label>

        <label>
          Expires At *
          <input
            type="date"
            name="expiresAt"
            value={form.expiresAt}
            onChange={onChange}
            style={inputStyle}
          />
        </label>

        <label>
          Notes (optional)
          <input
            name="notes"
            value={form.notes}
            onChange={onChange}
            placeholder="Extra info…"
            style={inputStyle}
          />
        </label>
      </div>

      <button type="submit" style={buttonStyle}>
        Add Warranty
      </button>
    </form>
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
