import React, { useState } from 'react';
import './Home.css';

const foodItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    price: 180,
    rating: 4.7,
    image: "https://source.unsplash.com/300x200/?biryani"
  },
  {
    id: 2,
    name: "Pizza",
    price: 250,
    rating: 4.5,
    image: "https://source.unsplash.com/300x200/?pizza"
  },
  {
    id: 3,
    name: "Burger",
    price: 120,
    rating: 4.3,
    image: "https://source.unsplash.com/300x200/?burger"
  },
  {
    id: 4,
    name: "Ice Cream",
    price: 90,
    rating: 4.6,
    image: "https://source.unsplash.com/300x200/?icecream"
  }
];

const Home = () => {
  const [search, setSearch] = useState('');

  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">

      {/* Navbar */}
      <nav className="navbar">
        <h2>🍽️ Foodie Hub</h2>
        <button className="logout-btn">Logout</button>
      </nav>

      {/* Search */}
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search food..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Food Cards */}
      <div className="food-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="food-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>⭐ {item.rating}</p>
            <p>₹{item.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;