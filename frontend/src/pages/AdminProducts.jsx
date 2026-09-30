import { useEffect, useState } from "react";
import "./AdminProducts.css";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "",
        price: "",
        oldPrice: "",
        rating: "",
        discount: "",
        image: "",
        description: "",
    });

    useEffect(() => {
        fetchProducts();
    }, []);


    const handleDelete = async (productId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/products/${productId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            setProducts((currentProducts) =>
                currentProducts.filter(
                    (product) => product.id !== productId
                )
            );

        } catch (error) {
            console.error("Delete Product Error:", error);
            alert("Failed to delete product");
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/products/${editingProduct.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(editingProduct),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            const updatedProduct = await response.json();

            setProducts((currentProducts) =>
                currentProducts.map((product) =>
                    product.id === updatedProduct.id
                        ? updatedProduct
                        : product
                )
            );

            setEditingProduct(null);

            alert("Product updated successfully!");

        } catch (error) {
            console.error("Update Product Error:", error);
            alert("Failed to update product");
        }
    };

    const handleAddProduct = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/products",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(newProduct),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add product");
            }

            const savedProduct = await response.json();

            setProducts((currentProducts) => [
                ...currentProducts,
                savedProduct,
            ]);

            setShowAddForm(false);

            setNewProduct({
                name: "",
                category: "",
                price: "",
                oldPrice: "",
                rating: "",
                discount: "",
                image: "",
                description: "",
            });

            alert("Product added successfully!");

        } catch (error) {
            console.error("Add Product Error:", error);
            alert("Failed to add product");
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/api/products"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Admin Products Error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading products...</div>;
    }

    return (
        <div className="admin-products-page">

            <div className="admin-products-header">
                <div>
                    <p>DECORNEXT ADMIN</p>
                    <h1>Product Management</h1>
                </div>

                <button onClick={() => setShowAddForm(true)}>
                    + Add Product
                </button>
            </div>


            {showAddForm && (
                <div className="admin-edit-form">
                    <div className="admin-edit-header">
                        <div>
                            <p>ADD PRODUCT</p>
                            <h2>New Product</h2>
                        </div>

                        <button onClick={() => setShowAddForm(false)}>
                            Cancel
                        </button>
                    </div>

                    <div className="admin-form-grid">

                        <div className="admin-form-group">
                            <label>Product Name</label>
                            <input
                                type="text"
                                value={newProduct.name}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Category</label>
                            <input
                                type="text"
                                value={newProduct.category}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        category: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Price</label>
                            <input
                                type="number"
                                value={newProduct.price}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        price: Number(e.target.value),
                                    })
                                }
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Old Price</label>
                            <input
                                type="number"
                                value={newProduct.oldPrice}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        oldPrice: Number(e.target.value),
                                    })
                                }
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Rating</label>
                            <input
                                type="number"
                                step="0.1"
                                value={newProduct.rating}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        rating: Number(e.target.value),
                                    })
                                }
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Discount (%)</label>
                            <input
                                type="number"
                                value={newProduct.discount}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        discount: Number(e.target.value),
                                    })
                                }
                            />
                        </div>

                        <div className="admin-form-group full-width">
                            <label>Image Path</label>
                            <input
                                type="text"
                                value={newProduct.image}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        image: e.target.value,
                                    })
                                }
                                placeholder="/products/product-image.png"
                            />
                        </div>

                        <div className="admin-form-group full-width">
                            <label>Description</label>
                            <textarea
                                rows="4"
                                value={newProduct.description}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </div>

                    </div>

                    <button
                        className="save-product-button"
                        onClick={handleAddProduct}
                    >
                        Add Product
                    </button>
                </div>
            )}


            {editingProduct && (
                <div className="admin-edit-form">
                    <div className="admin-edit-header">
                        <div>
                            <p>EDIT PRODUCT</p>
                            <h2>{editingProduct.name}</h2>
                        </div>

                        <button onClick={() => setEditingProduct(null)}>
                            Cancel
                        </button>
                    </div>

                    <div className="admin-form-grid">

                        <div className="admin-form-group">
                            <label>Product Name</label>
                            <input
                                type="text"
                                value={editingProduct.name}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Category</label>
                            <input
                                type="text"
                                value={editingProduct.category}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        category: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Price</label>
                            <input
                                type="number"
                                value={editingProduct.price}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        price: Number(e.target.value),
                                    })
                                }
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Old Price</label>
                            <input
                                type="number"
                                value={editingProduct.oldPrice || ""}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        oldPrice: Number(e.target.value),
                                    })
                                }
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Rating</label>
                            <input
                                type="number"
                                step="0.1"
                                value={editingProduct.rating || ""}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        rating: Number(e.target.value),
                                    })
                                }
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Discount (%)</label>
                            <input
                                type="number"
                                value={editingProduct.discount || ""}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        discount: Number(e.target.value),
                                    })
                                }
                            />
                        </div>

                        <div className="admin-form-group full-width">
                            <label>Image Path</label>
                            <input
                                type="text"
                                value={editingProduct.image || ""}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        image: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="admin-form-group full-width">
                            <label>Description</label>
                            <textarea
                                rows="4"
                                value={editingProduct.description || ""}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </div>

                    </div>

                    <button
                        className="save-product-button"
                        onClick={handleUpdate}
                    >
                        Save Changes
                    </button>
                </div>
            )}

            <div className="admin-products-table">

                <div className="admin-product-row admin-product-heading">
                    <span>Image</span>
                    <span>Product</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span>Actions</span>
                </div>

                {products.map((product) => (
                    <div
                        className="admin-product-row"
                        key={product.id}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                        />

                        <strong>{product.name}</strong>

                        <span>{product.category}</span>

                        <span>₹{product.price}</span>

                        <div className="admin-product-actions">
                            <button onClick={() => handleEdit(product)}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(product.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default AdminProducts;