import React from "react";
import "./Home.css";

function Home({ user }) {
  return (
    <div>
      {/* ✅ Welcome only */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {/* <h1>🍽️ Welcome {user?.name || "Guest"} to Tasty Bites</h1> */}
      </div>

      {/* ✅ Hero Section */}
      <section className="hero-section">
        <video
          src="/videos/video.mp4"
          autoPlay
          loop
          muted
          className="hero-video"
        />
        <div className="hero-overlay">
          <h1>🍽️ Welcome to Tasty Bites</h1>
          <button className="order-btn">Order Now</button>
        </div>
      </section>

      {/* Food Icons Carousel */}
      <section className="icons-carousel">
        <div className="icons-track">
          {[
            { name: "Burger", img: "/images/burger.jpg" },
            { name: "Pizza", img: "/images/veg pizza.jpg" },
            { name: "Drinks", img: "/images/drinks.webp" },
            { name: "Salad", img: "/images/salad bowl.jpg" },
            { name: "Dessert", img: "/images/images4.jpg" },
            { name: "Ice Cream", img: "/images/chocolate cake.jpg" },
            { name: "Burger", img: "/images/burger.jpg" },
            { name: "Cheese Pizza", img: "/images/cheese piza.jpg" },
            { name: "Fish Fry", img: "/images/fish fry.jpg" },
            { name: "Rajma", img: "/images/rajma.jpg" },
            { name: "Spring Roll", img: "/images/spring roll.jpg" },
          ].map((item, i) => (
            <div className="icon-card" key={i}>
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Today’s Specials */}
      <section className="specials">
        <h2 align="center">🥗 Today’s Special Items</h2>
        <div className="specials-carousel">
          <div className="specials-track">
            {[
              { name: "Paneer Tikka", img: "/images/paneer tikka.jpg" },
              { name: "Chicken Biryani", img: "/images/chicken biriyani.jpg" },
              { name: "Veg Noodles", img: "/images/veg noodles.jpg" },
              { name: "Fish Fry", img: "/images/fish fry.jpg" },
            ].map((item, i) => (
              <div className="special-card" key={i}>
                <img src={item.img} alt={item.name} />
                <h4>{item.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promises */}
      <section className="promises">
        <h2 align="center">💯 Our Promises</h2>
        <div className="promises-cards">
          <div className="promise-card">Fresh Ingredients</div>
          <div className="promise-card">Fast Delivery</div>
          <div className="promise-card">Hygienic Packaging</div>
          <div className="promise-card">Best Taste</div>
        </div>
      </section>

      {/* Popular / Today Menu */}
      <section className="popular">
        <h2 align="center">🍔 Popular Menu</h2>
        <div className="popular-cards">
          {[
            { name: "Cheese Pizza", price: 199, img: "/images/cheese piza.jpg" },
            { name: "Veg Burger", price: 149, img: "/images/burger.jpg" },
            { name: "Chocolate Cake", price: 99, img: "/images/chocolate cake.jpg" },
          ].map((item, i) => (
            <div className="card" key={i}>
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>
        <button className="explore-btn">Explore Full Menu</button>
      </section>

      {/* Customer Reviews */}
      <section className="reviews">
        <h2 align="center">⭐ Customer Reviews</h2>
        <div className="review-cards">
          <div className="card">
            <p>"Amazing food and quick delivery!"</p>
            <h4>- Priya</h4>
          </div>
          <div className="card">
            <p>"Best taste, totally recommend Tasty Bites!"</p>
            <h4>- Rahul</h4>
          </div>
          <div className="card">
            <p>"Fresh and delicious every time."</p>
            <h4>- Ananya</h4>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
