export default function FiltersBar({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  count,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        marginTop: 14,
        marginBottom: 10,
        flexWrap: "wrap",
      }}
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search product or platform…"
        style={{ ...inputStyle, flex: "1 1 260px" }}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <span style={{ opacity: 0.75 }}>{count} item(s)</span>
    </div>
  );
}

const inputStyle = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  outline: "none",
  minWidth: 220,
};
