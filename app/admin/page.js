"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PRODUCT_CATEGORIES, DEFAULT_CATEGORY } from "@/lib/categories";

export default function AdminPage() {
  // Password states
  const [authChecking, setAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Add form states
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [status, setStatus] = useState("");

  // Edit & Delete states
  const [editingId, setEditingId] = useState(null);
  const [editSku, setEditSku] = useState("");
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState(DEFAULT_CATEGORY);
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        const res = await fetch("/api/auth", { cache: "no-store" });
        if (!cancelled && res.ok) {
          setIsAuthenticated(true);
        }
      } catch {
        if (!cancelled) {
          setIsAuthenticated(false);
        }
      } finally {
        if (!cancelled) {
          setAuthChecking(false);
        }
      }
    }

    checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    let cancelled = false;

    async function loadProducts() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        if (!cancelled && data.success) {
          setProducts(data.products || []);
        }
      } catch {
        if (!cancelled) {
          setStatus("Products load karne mein dikkat aayi.");
        }
      } finally {
        if (!cancelled) {
          setFetching(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  async function refreshProducts() {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch {
      setStatus("Products load karne mein dikkat aayi.");
    } finally {
      setFetching(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setAuthError("");
    setLoggingIn(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setAuthError(data.message || "Galat password.");
      } else {
        setFetching(true);
        setIsAuthenticated(true);
        setPassword("");
      }
    } catch (err) {
      setAuthError(err?.message || "Server se connect nahi ho paaya.");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setEditingId(null);
    setProducts([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: sku.trim() || `AB-${Date.now().toString().slice(-5)}`,
          name,
          category,
          price: Number(price),
          image,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setStatus(data.message || "Product save nahi ho paaya.");
      } else {
        setStatus("Product database mein save ho gaya!");
        setSku("");
        setName("");
        setCategory(DEFAULT_CATEGORY);
        setPrice("");
        setImage("");
        await refreshProducts();
      }
    } catch {
      setStatus("Network ya server error aaya.");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(item) {
    setStatus("");
    setEditingId(item._id);
    setEditSku(item.sku || "");
    setEditName(item.name || "");
    setEditCategory(item.category || DEFAULT_CATEGORY);
    setEditPrice(String(item.price ?? ""));
    setEditImage(item.image || "");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditSku("");
    setEditName("");
    setEditCategory(DEFAULT_CATEGORY);
    setEditPrice("");
    setEditImage("");
  }

  async function handleUpdate(e, id) {
    e.preventDefault();
    setStatus("");
    setSavingEdit(true);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: editSku.trim(),
          name: editName.trim(),
          category: editCategory,
          price: Number(editPrice),
          image: editImage.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setStatus(data.message || "Product update nahi ho paaya.");
      } else {
        setStatus("Product update ho gaya!");
        setEditingId(null);
        await refreshProducts();
      }
    } catch {
      setStatus("Update karte waqt error aaya.");
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDelete(id, itemName) {
    const ok = window.confirm(`Kya aap "${itemName}" ko delete karna chahte hain?`);
    if (!ok) return;

    setStatus("");
    setDeletingId(id);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setStatus(data.message || "Product delete nahi ho paaya.");
      } else {
        setStatus("Product delete ho gaya!");
        if (editingId === id) {
          cancelEdit();
        }
        await refreshProducts();
      }
    } catch {
      setStatus("Delete karte waqt error aaya.");
    } finally {
      setDeletingId(null);
    }
  }

  if (authChecking) {
    return (
      <main style={{ maxWidth: 420, margin: "80px auto", padding: "0 16px" }}>
        <p>Checking access...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main style={{ maxWidth: 420, margin: "80px auto", padding: "0 16px" }}>
        <div
          style={{
            border: "1px solid #111",
            padding: 24,
            borderRadius: 0,
            background: "#fff",
          }}
        >
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#555",
              margin: "0 0 6px",
            }}
          >
            APNA BAZAR
          </p>
          <h1 style={{ fontSize: 24, margin: "0 0 10px" }}>Admin Login</h1>
          <p style={{ color: "#555", fontSize: 14, marginBottom: 18 }}>
            Admin panel kholne ke liye password daalein.
          </p>

          <form onSubmit={handleLogin} style={{ display: "grid", gap: 12 }}>
            <input
              type="password"
              required
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 0,
                border: "1px solid #111",
                boxSizing: "border-box",
              }}
            />
            <button
              type="submit"
              disabled={loggingIn}
              style={{
                padding: "11px 16px",
                borderRadius: 0,
                border: "1px solid #111",
                background: "#111",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {loggingIn ? "Verifying..." : "Unlock Admin Panel"}
            </button>
            {authError && (
              <p style={{ color: "#b91c1c", margin: 0, fontSize: 14 }}>
                {authError}
              </p>
            )}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 8,
        }}
      >
        <h1 style={{ fontSize: 28, margin: 0 }}>Apna Bazar — Admin Panel</h1>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            padding: "8px 14px",
            borderRadius: 0,
            border: "1px solid #111",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Lock / Logout
        </button>
      </div>

      <p style={{ color: "#555", marginBottom: 24 }}>
        SKU, category, name, price aur image link daal kar database mein product add, edit ya delete karein.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: 14,
          marginBottom: 32,
          padding: 20,
          border: "1px solid #111",
          borderRadius: 0,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
              SKU Code *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AB-001"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 0,
                border: "1px solid #111",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
              Category *
            </label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 0,
                border: "1px solid #111",
                background: "#fff",
                boxSizing: "border-box",
              }}
            >
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat.slug || cat.value || cat} value={cat.slug || cat.value || cat}>
                  {cat.label || cat.name || cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
              Product Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Organic Gir Cow Ghee"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 0,
                border: "1px solid #111",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
              Price (₹) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="any"
              placeholder="e.g. 699"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 0,
                border: "1px solid #111",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
              Image URL / Path *
            </label>
            <input
              type="text"
              required
              placeholder="https://res.cloudinary.com/... ya /images/ghee.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 0,
                border: "1px solid #111",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 18px",
            borderRadius: 0,
            border: "1px solid #16a34a",
            background: "#16a34a",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {loading ? "Saving..." : "Add Product"}
        </button>

        {status && <p style={{ margin: 0, fontWeight: 500 }}>{status}</p>}
      </form>

      <h2 style={{ fontSize: 20, marginBottom: 14 }}>
        Saved Products ({products.length})
      </h2>

      {fetching ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p style={{ color: "#666" }}>Abhi koi product database mein nahi hai.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {products.map((item) => {
            const isEditing = editingId === item._id;

            return (
              <div
                key={item._id}
                style={{
                  border: "1px solid #111",
                  borderRadius: 0,
                  padding: 12,
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                {isEditing ? (
                  <form
                    onSubmit={(e) => handleUpdate(e, item._id)}
                    style={{ display: "grid", gap: 8 }}
                  >
                    <input
                      type="text"
                      required
                      value={editSku}
                      onChange={(e) => setEditSku(e.target.value)}
                      placeholder="SKU"
                      style={{
                        padding: 8,
                        borderRadius: 0,
                        border: "1px solid #111",
                      }}
                    />
                    <select
                      required
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      style={{
                        padding: 8,
                        borderRadius: 0,
                        border: "1px solid #111",
                        background: "#fff",
                      }}
                    >
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <option
                          key={cat.slug || cat.value || cat}
                          value={cat.slug || cat.value || cat}
                        >
                          {cat.label || cat.name || cat}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Product Name"
                      style={{
                        padding: 8,
                        borderRadius: 0,
                        border: "1px solid #111",
                      }}
                    />
                    <input
                      type="number"
                      required
                      min="0"
                      step="any"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      placeholder="Price"
                      style={{
                        padding: 8,
                        borderRadius: 0,
                        border: "1px solid #111",
                      }}
                    />
                    <input
                      type="text"
                      required
                      value={editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                      placeholder="Image URL"
                      style={{
                        padding: 8,
                        borderRadius: 0,
                        border: "1px solid #111",
                      }}
                    />

                    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                      <button
                        type="submit"
                        disabled={savingEdit}
                        style={{
                          flex: 1,
                          padding: "8px 10px",
                          borderRadius: 0,
                          border: "1px solid #16a34a",
                          background: "#16a34a",
                          color: "#fff",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        {savingEdit ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        style={{
                          flex: 1,
                          padding: "8px 10px",
                          borderRadius: 0,
                          border: "1px solid #111",
                          background: "#fff",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div>
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: 150,
                          marginBottom: 10,
                          overflow: "hidden",
                          border: "1px solid #eee",
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 240px"
                          style={{ objectFit: "cover", borderRadius: 0 }}
                        />
                      </div>
                      <div style={{ fontSize: 11, color: "#666" }}>{item.sku}</div>
                      {item.category && (
                        <div style={{ fontSize: 11, color: "#374151", marginBottom: 2 }}>
                          {item.category}
                        </div>
                      )}
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>
                        {item.name}
                      </div>
                      <div style={{ color: "#15803d", fontWeight: 700 }}>
                        ₹{item.price}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        style={{
                          flex: 1,
                          padding: "7px 10px",
                          borderRadius: 0,
                          border: "1px solid #111",
                          background: "#fff",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === item._id}
                        onClick={() => handleDelete(item._id, item.name)}
                        style={{
                          flex: 1,
                          padding: "7px 10px",
                          borderRadius: 0,
                          border: "1px solid #b91c1c",
                          background: "#b91c1c",
                          color: "#fff",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        {deletingId === item._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}