import React from 'react';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h2>Welcome to Food Ordering App</h2>
      {user && <p>Hello, {user.name}!</p>}
      <p>This is the main app page. Dummy content for now.</p>
      {/* Add links to browse restaurants, cart, orders, etc. */}
    </div>
  );
};

export default Home;