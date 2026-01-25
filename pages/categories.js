import { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert, Table, Badge, Modal } from "react-bootstrap";
import { supabase } from "../lib/supabaseClient";
import { requireAuth } from "../lib/requireAuth";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);
      setError("");

      // Fetch categories with warranty counts
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (categoriesError) throw categoriesError;

      // For each category, count warranties
      const categoriesWithCounts = await Promise.all(
        (categoriesData || []).map(async (cat) => {
          const { count, error } = await supabase
            .from("warranties")
            .select("*", { count: "exact", head: true })
            .eq("category_id", cat.id);

          if (error) console.error("Error counting warranties:", error);

          return {
            ...cat,
            warrantyCount: count || 0,
          };
        })
      );

      setCategories(categoriesWithCounts);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddCategory(e) {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { error } = await supabase
        .from("categories")
        .insert([{ user_id: userData.user.id, name: newCategoryName.trim() }]);

      if (error) throw error;

      setNewCategoryName("");
      fetchCategories();
    } catch (err) {
      console.error("Error adding category:", err);
      setError(err.message || "Failed to add category");
    }
  }

  function openEditModal(category) {
    setEditingCategory(category);
    setEditName(category.name);
    setShowEditModal(true);
  }

  async function handleRenameCategory() {
    if (!editName.trim() || !editingCategory) return;

    try {
      const { error } = await supabase
        .from("categories")
        .update({ name: editName.trim() })
        .eq("id", editingCategory.id);

      if (error) throw error;

      setShowEditModal(false);
      setEditingCategory(null);
      setEditName("");
      fetchCategories();
    } catch (err) {
      console.error("Error renaming category:", err);
      setError(err.message || "Failed to rename category");
    }
  }

  async function handleDeleteCategory(category) {
    if (category.warrantyCount > 0) {
      if (
        !window.confirm(
          `This category has ${category.warrantyCount} warranty/warranties. Deleting it will unassign these warranties. Continue?`
        )
      ) {
        return;
      }
    } else {
      if (!window.confirm(`Delete category "${category.name}"?`)) {
        return;
      }
    }

    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", category.id);

      if (error) throw error;

      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      setError(err.message || "Failed to delete category");
    }
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Manage Categories</h1>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* Add Category Form */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-3">Add New Category</h5>
          <Form onSubmit={handleAddCategory}>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Category name (e.g., Electronics, Appliances)"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                required
              />
              <Button type="submit" variant="dark">
                Add
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Categories List */}
      <Card className="shadow-sm">
        <Card.Body>
          <h5 className="mb-3">Your Categories</h5>
          {loading ? (
            <p className="text-muted text-center">Loading...</p>
          ) : categories.length === 0 ? (
            <p className="text-muted text-center">
              No categories yet. Add one above.
            </p>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th className="text-center">Warranties</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>
                      <strong>{cat.name}</strong>
                    </td>
                    <td className="text-center">
                      <Badge bg={cat.warrantyCount > 0 ? "primary" : "secondary"}>
                        {cat.warrantyCount}
                      </Badge>
                    </td>
                    <td className="text-end">
                      <Button
                        variant="outline-dark"
                        size="sm"
                        className="me-2"
                        onClick={() => openEditModal(cat)}
                      >
                        Rename
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteCategory(cat)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rename Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              autoFocus
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleRenameCategory}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default requireAuth(Categories);
