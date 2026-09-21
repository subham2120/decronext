import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/products/${id}`
                );

                if (!response.ok) {
                    throw new Error("Product not found");
                }

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Product Details Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="product-loading">
                Loading product...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Product not found</h2>
                <button onClick={() => navigate("/shop")}>
                    Back to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="product-details-page">

            <button
                className="back-button"
                onClick={() => navigate("/shop")}
            >
                ← Back to Shop
            </button>

            <div className="product-details-container">

                <div className="product-details-image">
                    <img
                        src={product.image}
                        alt={product.name}
                    />

                    {product.discount && (
                        <span className="details-discount">
                            {product.discount}% OFF
                        </span>
                    )}
                </div>

                <div className="product-details-info">

                    <p className="details-category">
                        {product.category}
                    </p>

                    <h1>{product.name}</h1>

                    <div className="details-rating">
                        ⭐ {product.rating}
                    </div>

                    <div className="details-price">
                        <span className="details-current-price">
                            ₹{product.price}
                        </span>

                        {product.oldPrice && (
                            <span className="details-old-price">
                                ₹{product.oldPrice}
                            </span>
                        )}
                    </div>

                    <p className="details-description">
                        {product.description ||
                            "Beautifully designed decor piece made to bring style and warmth to your home."}
                    </p>

                    <div className="quantity-section">
                        <span>Quantity</span>

                        <div className="quantity-control">
                            <button
                                onClick={() =>
                                    setQuantity((prev) =>
                                        Math.max(1, prev - 1)
                                    )
                                }
                            >
                                −
                            </button>

                            <span>{quantity}</span>

                            <button
                                onClick={() =>
                                    setQuantity((prev) => prev + 1)
                                }
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button
                        className="details-add-cart"
                        onClick={() => {
                            addToCart(product, quantity);
                            navigate("/cart");
                        }}
                    >
                        Add to Cart
                    </button>

                    <div className="product-features">
                        <div>
                            <strong>✓</strong>
                            <span>Premium Quality</span>
                        </div>

                        <div>
                            <strong>✓</strong>
                            <span>Secure Packaging</span>
                        </div>

                        <div>
                            <strong>✓</strong>
                            <span>Easy Returns</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductDetails;