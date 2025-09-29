
import React, { useState } from "react";
import "./Veg.css";
import { useCart } from "./CartContext";

const vegItems = [
  { id: 1, name: "Paneer Tikka", price: 199, img: "/images/paneer tikka.jpg" },
  { id: 2, name: "Veg Biryani", price: 179, img: "/images/veg rice.jpg" },
  { id: 3, name: "Veg Noodles", price: 149, img: "/images/veg noodles.jpg" },
  { id: 4, name: "Veg Burger", price: 129, img: "/images/burger.jpg" },
  { id: 5, name: "Cheese Pizza", price: 199, img: "/images/cheese piza.jpg" },
  { id: 6, name: "Salad Bowl", price: 99, img: "/images/salad bowl.jpg" },
  { id: 7, name: "Spring Rolls", price: 89, img: "/images/spring roll.jpg" },
  { id: 8, name: "Veg Sandwich", price: 119, img: "/images/veg sandwich.jpg" },
  { id: 9, name: "Mushroom Curry", price: 209, img: "/images/mashroom curry.jpg" },
  { id: 10, name: "Chole Bhature", price: 159, img: "/images/cholo batori.jpg" },
  { id: 11, name: "Veg Momos", price: 99, img: "/images/veg momos.webp" },
  { id: 12, name: "Veg Cutlet", price: 89, img: "/images/veg cutlet.jpg" },
  { id: 13, name: "Veg Pulao", price: 149, img: "/images/veg pulaov.jpg" },
  { id: 14, name: "Aloo Paratha", price: 79, img: "/images/aloo paratha.jpg" },
  { id: 15, name: "Mix Veg Curry", price: 169, img: "/images/mix veg curry.jpg" },
  { id: 16, name: "Dal Fry", price: 129, img: "/images/dal fry.jpg" },
  { id: 17, name: "Rajma Chawal", price: 159, img: "/images/rajma.jpg" },
  { id: 18, name: "Veg Frankie", price: 119, img: "/images/veg pizza.jpg" },
  { id: 19, name: "Veg Fried Rice", price: 139, img: "/images/veg rice.jpg" },
  { id: 20, name: "Veg Pakora", price: 89, img: "/images/veg pakora.jpg" },
  { id: 21, name: "Veg Pizza", price: 229, img: "/images/veg pizza.jpg" },
  { id: 22, name: "Paneer Butter Masala", price: 249, img: "/images/paneer tikka.jpg" },
  { id: 23, name: "Spring Roll Platter", price: 149, img: "/images/spring roll.jpg" },
  { id: 24, name: "Veg Thali", price: 199, img: "/images/veg pakora.jpg" },
];

function Veg() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { addToCart } = useCart();

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = vegItems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(vegItems.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="veg-page">
      <h1>🥗 Veg Menu</h1>
      <div className="veg-cards">
        {currentItems.map((item) => (
          <div className="veg-card" key={item.id}>
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="add-cart-btn"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Pagination */}
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

    
    </div>
  );
}

export default Veg;

