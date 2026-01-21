function daysLeft(expiresAt) {
  const end = new Date(expiresAt + "T00:00:00");
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function getStatus(days) {
  if (!isFinite(days)) return { label: "—", variant: "secondary" };
  if (days < 0) return { label: `Expired (${Math.abs(days)}d ago)`, variant: "danger" };
  if (days <= 90) return { label: "< 3 months", variant: "danger" };
  if (days <= 180) return { label: "< 6 months", variant: "warning" };
  return { label: "OK", variant: "success" };
}

const badgeStyle = (variant) => {
  const map = {
    danger: { bg: "#fee2e2", fg: "#991b1b", border: "#fecaca" },
    warning: { bg: "#fef9c3", fg: "#854d0e", border: "#fde68a" },
    success: { bg: "#dcfce7", fg: "#166534", border: "#bbf7d0" },
    secondary: { bg: "#e5e7eb", fg: "#374151", border: "#d1d5db" },
  };
  const c = map[variant] || map.secondary;
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    background: c.bg,
    color: c.fg,
    border: `1px solid ${c.border}`,
  };
};

export default function WarrantyList({ items, onDelete, onEdit }) {
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
        const status = getStatus(left);

        return (
          <div
            key={it.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 14,
              padding: 14,
              background: "white",
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <strong style={{ fontSize: 16 }}>{it.product}</strong>
                <span style={{ opacity: 0.7 }}>{it.platform}</span>
                <span style={badgeStyle(status.variant)}>{status.label}</span>
              </div>

              <div style={{ marginTop: 6, opacity: 0.8, fontSize: 13 }}>
                Category: <strong>{it.category}</strong> • Purchased:{" "}
                <strong>{it.purchaseDate}</strong> • Expires: <strong>{it.expiresAt}</strong> •{" "}
                Days left: <strong>{isFinite(left) ? left : "—"}</strong>
              </div>

              {it.notes ? <div style={{ marginTop: 8 }}>{it.notes}</div> : null}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => onEdit(it)} style={editStyle}>
                Edit
              </button>
              <button onClick={() => onDelete(it.id)} style={dangerStyle}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

const dangerStyle = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid #ef4444",
  background: "white",
  color: "#ef4444",
  cursor: "pointer",
  height: 38,
  alignSelf: "start",
};

const editStyle = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid #111",
  background: "white",
  color: "#111",
  cursor: "pointer",
  height: 38,
  alignSelf: "start",
};
