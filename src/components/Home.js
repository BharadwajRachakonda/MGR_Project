import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [checkoutStatus, setCheckoutStatus] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [restaurantsResponse, menuItemsResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/restaurants"),
          axios.get("http://localhost:8080/api/menu-items"),
        ]);

        setRestaurants(
          Array.isArray(restaurantsResponse.data)
            ? restaurantsResponse.data
            : [],
        );
        setMenuItems(
          Array.isArray(menuItemsResponse.data) ? menuItemsResponse.data : [],
        );
      } catch (fetchError) {
        setError(
          "Unable to load restaurants and menu items. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const restaurantLookup = useMemo(() => {
    return restaurants.reduce((lookup, restaurant) => {
      lookup[restaurant.restaurantId] = restaurant;
      return lookup;
    }, {});
  }, [restaurants]);

  const cartLookup = useMemo(() => {
    return cart.reduce((lookup, cartItem) => {
      lookup[cartItem.itemId] = cartItem;
      return lookup;
    }, {});
  }, [cart]);

  const filteredMenuItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return menuItems.filter((item) => {
      const matchesRestaurant =
        selectedRestaurantId === "all" ||
        item.restaurantId === selectedRestaurantId;
      const matchesSearch =
        !normalizedSearch ||
        item.name?.toLowerCase().includes(normalizedSearch) ||
        item.itemId?.toLowerCase().includes(normalizedSearch) ||
        item.restaurantId?.toLowerCase().includes(normalizedSearch);

      return matchesRestaurant && matchesSearch;
    });
  }, [menuItems, searchTerm, selectedRestaurantId]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const activeRestaurant =
    selectedRestaurantId === "all"
      ? null
      : restaurantLookup[selectedRestaurantId];

  const cartCount = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );
  const cartTotal = cart.reduce(
    (total, cartItem) =>
      total + Number(cartItem.price || 0) * cartItem.quantity,
    0,
  );

  const getCurrentUserId = () => {
    if (!user) {
      return "guest";
    }

    return user.userId || user.id || user.email || "guest";
  };

  const addToCart = (item) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.itemId === item.itemId,
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.itemId === item.itemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [
        ...currentCart,
        {
          itemId: item.itemId,
          name: item.name,
          price: Number(item.price || 0),
          imageURL: item.imageURL,
          restaurantId: item.restaurantId,
          quantity: 1,
        },
      ];
    });
    setCheckoutStatus("");
    setCheckoutError("");
  };

  const updateCartQuantity = (itemId, nextQuantity) => {
    if (nextQuantity <= 0) {
      setCart((currentCart) =>
        currentCart.filter((cartItem) => cartItem.itemId !== itemId),
      );
      return;
    }

    setCart((currentCart) =>
      currentCart.map((cartItem) =>
        cartItem.itemId === itemId
          ? { ...cartItem, quantity: nextQuantity }
          : cartItem,
      ),
    );
  };

  const removeFromCart = (itemId) => {
    setCart((currentCart) =>
      currentCart.filter((cartItem) => cartItem.itemId !== itemId),
    );
  };

  const checkout = async () => {
    if (!cart.length) {
      setCheckoutError("Add at least one item before placing an order.");
      return;
    }

    const userId = getCurrentUserId();
    const orderId = `ORD-${Date.now()}`;

    try {
      setIsCheckingOut(true);
      setCheckoutError("");
      setCheckoutStatus("");

      await axios.post("http://localhost:8080/api/orders", {
        orderId,
        userId,
        status: "PLACED",
        totalAmount: cartTotal,
      });

      await Promise.all(
        cart.map((cartItem, index) =>
          axios.post("http://localhost:8080/api/order-items", {
            orderItemId: `ORDITEM-${Date.now()}-${index + 1}`,
            orderId,
            itemId: cartItem.itemId,
            quantity: cartItem.quantity,
          }),
        ),
      );

      setCart([]);
      setCheckoutStatus(
        `Order ${orderId} placed successfully for $${cartTotal.toFixed(2)}.`,
      );
    } catch (checkoutRequestError) {
      setCheckoutError(
        "Checkout failed. Please make sure the backend order APIs are running and try again.",
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="home-page">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">Food ordering dashboard</p>
          <h1>Browse restaurants, build a cart, and place an order</h1>
          <p className="hero-copy">
            {user ? `Welcome back, ${user.name}.` : "Welcome back."} Explore the
            live restaurant catalog, add dishes to cart, and submit the order.
          </p>
        </div>
        <button type="button" className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="summary-strip">
        <div className="summary-card">
          <span>Restaurants</span>
          <strong>{restaurants.length}</strong>
        </div>
        <div className="summary-card">
          <span>Menu items</span>
          <strong>{menuItems.length}</strong>
        </div>
        <div className="summary-card">
          <span>Visible items</span>
          <strong>{filteredMenuItems.length}</strong>
        </div>
        <div className="summary-card">
          <span>Cart items</span>
          <strong>{cartCount}</strong>
        </div>
      </section>

      <section className="dashboard-grid">
        <aside className="panel restaurants-panel">
          <div className="panel-header">
            <h2>Restaurants</h2>
            {/* <span>API: /api/restaurants</span> */}
          </div>

          <button
            type="button"
            className={`restaurant-chip ${selectedRestaurantId === "all" ? "active" : ""}`}
            onClick={() => setSelectedRestaurantId("all")}
          >
            All restaurants
          </button>

          <div className="restaurant-list">
            {restaurants.map((restaurant) => (
              <button
                type="button"
                key={restaurant.restaurantId}
                className={`restaurant-card ${selectedRestaurantId === restaurant.restaurantId ? "active" : ""}`}
                onClick={() => setSelectedRestaurantId(restaurant.restaurantId)}
              >
                {/* <span className="restaurant-id">{restaurant.restaurantId}</span> */}
                <strong>{restaurant.name}</strong>
                <p>{restaurant.location}</p>
              </button>
            ))}
          </div>
        </aside>

        <main className="panel menu-panel">
          <div className="panel-header menu-panel-header">
            <div>
              <h2>Menu items</h2>
              {/* <span>API: /api/menu-items</span> */}
            </div>

            <div className="menu-controls">
              <input
                type="search"
                placeholder="Search menu items"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {activeRestaurant && (
            <div className="active-filter">
              Showing items for {activeRestaurant.name} in{" "}
              {activeRestaurant.location}
            </div>
          )}

          {loading && (
            <div className="state-message">
              Loading restaurants and menu items...
            </div>
          )}
          {error && !loading && (
            <div className="state-message error">{error}</div>
          )}

          {!loading && !error && (
            <div className="menu-grid">
              {filteredMenuItems.map((item) => {
                const restaurant = restaurantLookup[item.restaurantId];
                const inCart = Boolean(cartLookup[item.itemId]);

                return (
                  <article className="menu-card" key={item.itemId}>
                    {item.imageURL ? (
                      <img
                        src={item.imageURL}
                        alt={item.name}
                        className="menu-image"
                      />
                    ) : (
                      <div className="menu-image placeholder">
                        No image available
                      </div>
                    )}
                    <div className="menu-card-body">
                      <div className="menu-card-top">
                        <strong>{item.name}</strong>
                        <span className="price">
                          ${Number(item.price ?? 0).toFixed(2)}
                        </span>
                      </div>
                      {/* <p className="menu-meta">Item ID: {item.itemId}</p> */}
                      <p className="menu-meta">
                        Restaurant:{" "}
                        {restaurant ? restaurant.name : item.restaurantId}
                      </p>
                      <button
                        type="button"
                        className={`add-to-cart-btn ${inCart ? "in-cart" : ""}`}
                        onClick={() => addToCart(item)}
                      >
                        {inCart ? "Add one more" : "Add to cart"}
                      </button>
                    </div>
                  </article>
                );
              })}

              {filteredMenuItems.length === 0 && (
                <div className="state-message empty">
                  No menu items match the current filter.
                </div>
              )}
            </div>
          )}
        </main>

        <aside className="panel cart-panel">
          <div className="panel-header cart-panel-header">
            <div>
              <h2>Cart</h2>
              {/* <span>API: /api/orders + /api/order-items</span> */}
            </div>
            <strong className="cart-total-summary">
              ${cartTotal.toFixed(2)}
            </strong>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="state-message empty cart-empty">
                Your cart is empty. Add menu items to place an order.
              </div>
            ) : (
              cart.map((cartItem) => {
                const restaurant = restaurantLookup[cartItem.restaurantId];

                return (
                  <div className="cart-item" key={cartItem.itemId}>
                    {cartItem.imageURL ? (
                      <img
                        src={cartItem.imageURL}
                        alt={cartItem.name}
                        className="cart-item-image"
                      />
                    ) : (
                      <div className="cart-item-image placeholder">
                        No image
                      </div>
                    )}

                    <div className="cart-item-details">
                      <strong>{cartItem.name}</strong>
                      <span>
                        {restaurant ? restaurant.name : cartItem.restaurantId}
                      </span>
                      <span>
                        ${Number(cartItem.price || 0).toFixed(2)} each
                      </span>
                      <div className="cart-quantity-controls">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(
                              cartItem.itemId,
                              cartItem.quantity - 1,
                            )
                          }
                        >
                          -
                        </button>
                        <strong>{cartItem.quantity}</strong>
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(
                              cartItem.itemId,
                              cartItem.quantity + 1,
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeFromCart(cartItem.itemId)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {checkoutStatus && (
            <div className="checkout-message success">{checkoutStatus}</div>
          )}
          {checkoutError && (
            <div className="checkout-message error">{checkoutError}</div>
          )}

          <button
            type="button"
            className="checkout-btn"
            onClick={checkout}
            disabled={isCheckingOut || cart.length === 0}
          >
            {isCheckingOut ? "Placing order..." : "Place order"}
          </button>
        </aside>
      </section>
    </div>
  );
};

export default Home;
