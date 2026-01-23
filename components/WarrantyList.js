import { Card, Badge, Button, ButtonGroup } from "react-bootstrap";

function daysLeft(expiresAt) {
  const end = new Date(expiresAt + "T00:00:00");
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function getStatus(days) {
  if (!isFinite(days)) return { label: "—", variant: "secondary" };
  if (days < 0) return { label: `Expired ${Math.abs(days)}d ago`, variant: "danger" };
  if (days <= 90) return { label: "< 3 months", variant: "danger" };
  if (days <= 180) return { label: "< 6 months", variant: "warning" };
  return { label: "Active", variant: "success" };
}

export default function WarrantyList({ items, onDelete, onEdit }) {
  if (items.length === 0) {
    return (
      <Card className="text-center text-muted border-dashed">
        <Card.Body className="py-5">
          <p className="mb-0">No warranties yet. Add one above.</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className="d-grid gap-3">
      {items.map((it) => {
        const left = daysLeft(it.expiresAt);
        const status = getStatus(left);

        return (
          <Card key={it.id} className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2 flex-wrap mb-2">
                    <h5 className="mb-0">{it.product}</h5>
                    <Badge bg="light" text="dark" className="fw-normal">
                      {it.platform}
                    </Badge>
                    <Badge bg={status.variant}>{status.label}</Badge>
                  </div>

                  <div className="text-muted small mb-2">
                    <span className="me-3">
                      <strong>Category:</strong> {it.category}
                    </span>
                    <span className="me-3">
                      <strong>Purchased:</strong> {it.purchaseDate}
                    </span>
                    <span className="me-3">
                      <strong>Expires:</strong> {it.expiresAt}
                    </span>
                    <span>
                      <strong>Days left:</strong> {isFinite(left) ? left : "—"}
                    </span>
                  </div>

                  {it.notes && (
                    <p className="mb-0 mt-2 text-secondary">
                      <small>{it.notes}</small>
                    </p>
                  )}
                </div>

                <ButtonGroup className="ms-3">
                  <Button variant="outline-dark" size="sm" onClick={() => onEdit(it)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => onDelete(it.id)}>
                    Delete
                  </Button>
                </ButtonGroup>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
