import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";

// Context
const RestaurantContext = createContext();

// Header Component
function Header() {
  const { restaurantName, status } = useContext(RestaurantContext);

  return (
    <div
      style={{
        background: "#f4f4f4",
        padding: "15px",
        marginBottom: "20px",
      }}
    >
      <h1>{restaurantName}</h1>
      <h3>Delivery Status : {status}</h3>
    </div>
  );
}

// Menu Component
function Menu({
  menu,
  foodName,
  setFoodName,
  price,
  setPrice,
  addFood,
  addToCart,
}) {
  return (
    <div>
      <h2>Menu</h2>

      <input
        type="text"
        placeholder="Food Name"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={addFood}>Add Food</button>

      <hr />

      {menu.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span>
            {item.name} - ₹{item.price}
          </span>

          <button onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

// Cart Component
function Cart({ cart, removeFromCart }) {
  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>No Items Added</p>
      ) : (
        cart.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>
              {item.name} - ₹{item.price}
            </span>

            <button onClick={() => removeFromCart(index)}>
              Remove
            </button>
          </div>
        ))
      )}

      <hr />

      <h3>Total Amount : ₹{total}</h3>
    </div>
  );
}

// App Component
function App() {
  // useState
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");

  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  const [restaurantName] = useState("Food Express");
  const [status] = useState("Delivery Available");

  // useEffect
  useEffect(() => {
    setMenu([
      {
        id: 1,
        name: "Pizza",
        price: 250,
      },
      {
        id: 2,
        name: "Burger",
        price: 150,
      },
      {
        id: 3,
        name: "Pasta",
        price: 200,
      },
    ]);
  }, []);

  // useCallback
  const addFood = useCallback(() => {
    if (!foodName || !price) return;

    const newFood = {
      id: Date.now(),
      name: foodName,
      price: Number(price),
    };

    setMenu((prev) => [...prev, newFood]);

    setFoodName("");
    setPrice("");
  }, [foodName, price]);

  const addToCart = useCallback((item) => {
    setCart((prev) => [...prev, item]);
  }, []);

  const removeFromCart = useCallback((index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <RestaurantContext.Provider
      value={{
        restaurantName,
        status,
      }}
    >
      <div
        style={{
          width: "700px",
          margin: "20px auto",
          padding: "20px",
          border: "1px solid gray",
          borderRadius: "10px",
        }}
      >
        <Header />

        <Menu
          menu={menu}
          foodName={foodName}
          setFoodName={setFoodName}
          price={price}
          setPrice={setPrice}
          addFood={addFood}
          addToCart={addToCart}
        />

        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
        />
      </div>
    </RestaurantContext.Provider>
  );
}

export default App;