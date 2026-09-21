import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    setWishlistItems((items) => {
      const exists = items.find((i) => i.id === product.id);

      if (exists) {
        return items.filter((i) => i.id !== product.id);
      }

      return [...items, product];
    });
  };

  const isWishlisted = (id) =>
    wishlistItems.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}