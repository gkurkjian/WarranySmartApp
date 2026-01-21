function daysLeft(expiresAt) {
  const end = new Date(expiresAt + "T00:00:00");
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export default function WarrantyList({ items, onDelete }) {
  if (items.length === 0) {
    return (
      <div style={{ padding: 12, border: "1px dashed #ccc", borderRadius: 10, opacity: 0.8 }}>
        No warranties yet. Add one above.
      </div>
    );
  }

  return (
    <section style={{ display: "grid", gap: 10 }}>
      {items.map((it) => {
        const left = daysLeft(it.expiresAt);
        const badge = left <= 90 ? "🔥 < 3 months" : left <= 180 ? "⚠️ < 6 months" : "✅ OK";

        return (
          <div
            key={it.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 12,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <strong style={{ fontSize: 16 }}>{it.product}</strong>
                <span style={{ opacity: 0.7 }}>({it.platform})</span>
                <span style={{ fontSize: 12, opacity: 0.85 }}>
                  {it.category} • {badge}
                </span>
              </div>

              <div style={{ marginTop: 6, opacity: 0.8 }}>
                Purchased: <strong>{it.purchaseDate}</strong> • Expires:{" "}
                <strong>{it.expiresAt}</strong> • Days left:{" "}
                <strong>{isFinite(left) ? left : "—"}</strong>
              </div>

              {it.notes ? <div style={{ marginTop: 6 }}>{it.notes}</div> : null}
            </div>

            <button onClick={() => onDelete(it.id)} style={dangerStyle}>
              Delete
            </button>
          </div>
        );
      })}
    </section>
  );
}

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
