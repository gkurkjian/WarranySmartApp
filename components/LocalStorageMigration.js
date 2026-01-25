import { useState } from "react";
import { Card, Button, Alert, Badge, ListGroup } from "react-bootstrap";
import { supabase } from "../lib/supabaseClient";

export default function LocalStorageMigration({ onComplete }) {
  const [localData, setLocalData] = useState(null);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function checkLocalStorage() {
    try {
      const stored = localStorage.getItem("warranty_items_v1");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLocalData(parsed);
          return;
        }
      }
      setError("No warranty data found in localStorage.");
    } catch (err) {
      console.error("Error reading localStorage:", err);
      setError("Failed to read localStorage data.");
    }
  }

  async function handleImport() {
    if (!localData || localData.length === 0) return;

    setImporting(true);
    setError("");
    setSuccess("");

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Transform localStorage data to database format
      const warranties = localData.map((item) => ({
        user_id: userData.user.id,
        product: item.product || "Unknown Product",
        platform: item.platform || "Unknown Platform",
        category_id: null, // Will need to be set manually
        purchase_date: item.purchaseDate || new Date().toISOString().split("T")[0],
        expires_at: item.expiresAt || new Date().toISOString().split("T")[0],
        notes: item.notes || null,
      }));

      // Insert all warranties
      const { error: insertError } = await supabase
        .from("warranties")
        .insert(warranties);

      if (insertError) throw insertError;

      setSuccess(
        `Successfully imported ${warranties.length} warranty/warranties!`
      );
      setLocalData(null);

      if (onComplete) {
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    } catch (err) {
      console.error("Error importing data:", err);
      setError(err.message || "Failed to import data");
    } finally {
      setImporting(false);
    }
  }

  function handleClearLocalStorage() {
    if (
      !window.confirm(
        "Are you sure you want to clear localStorage? This will permanently delete the local data."
      )
    ) {
      return;
    }

    try {
      localStorage.removeItem("warranty_items_v1");
      setSuccess("localStorage cleared successfully!");
      setLocalData(null);
    } catch (err) {
      console.error("Error clearing localStorage:", err);
      setError("Failed to clear localStorage");
    }
  }

  return (
    <Card className="shadow-sm mb-4 border-primary">
      <Card.Body>
        <h5 className="mb-3">
          Import from LocalStorage{" "}
          <Badge bg="info" className="ms-2">
            Optional
          </Badge>
        </h5>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {!localData ? (
          <div>
            <p className="text-muted mb-3">
              If you previously used this app with localStorage, you can import
              your old warranties here.
            </p>
            <Button variant="primary" onClick={checkLocalStorage}>
              Check for LocalStorage Data
            </Button>
          </div>
        ) : (
          <div>
            <p className="mb-3">
              Found <strong>{localData.length}</strong> warranty/warranties in
              localStorage:
            </p>

            <ListGroup className="mb-3" style={{ maxHeight: "200px", overflowY: "auto" }}>
              {localData.slice(0, 5).map((item, idx) => (
                <ListGroup.Item key={idx}>
                  <strong>{item.product}</strong> - {item.platform}
                  <br />
                  <small className="text-muted">
                    Expires: {item.expiresAt}
                  </small>
                </ListGroup.Item>
              ))}
              {localData.length > 5 && (
                <ListGroup.Item className="text-muted">
                  ... and {localData.length - 5} more
                </ListGroup.Item>
              )}
            </ListGroup>

            <div className="d-flex gap-2">
              <Button
                variant="success"
                onClick={handleImport}
                disabled={importing}
              >
                {importing ? "Importing..." : "Import to Database"}
              </Button>
              <Button
                variant="outline-danger"
                onClick={handleClearLocalStorage}
                disabled={importing}
              >
                Clear LocalStorage
              </Button>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
