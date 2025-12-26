
import React, { useState } from "react";
import "./veg.css";
import { useCart } from "./CartContext";

const vegItems = [
  { id: 1, name: "samosa", price: 199, img: "/images/samosa.webp" },
  { id: 2, name: "chakka", price: 179, img: "/images/chakka.jpeg" },
  { id: 3, name: "chakrallu", price: 149, img: "/images/chakrallu.jpeg" },
  { id: 4, name: "eggpuff", price: 129, img: "/images/eggpoff.webp" },
  { id: 5, name: "egg masala", price: 199, img: "/images/egg masala.jpeg" },
  { id: 6, name: "egg rolls", price: 99, img: "/images/eggrolls.jpeg" },
  { id: 7, name: "Spring Rolls", price: 89, img: "/images/spring roll.jpg" },
  { id: 8, name: "Veg Sandwich", price: 119, img: "/images/veg sandwich.jpg" },
  { id: 9, name: "masala palli", price: 209, img: "/images/masala palli.jpeg" },
  { id: 10, name: "mirchi bajji", price: 159, img: "/images/mirchibajji.jpeg" },
  { id: 11, name: "Veg Momos", price: 99, img: "/images/veg momos.webp" },
  { id: 12, name: "Veg Cutlet", price: 89, img: "/images/veg cutlet.jpg" },
  { id: 13, name: "french", price: 149, img: "/images/french.jpeg" },
  { id: 14, name: "veg puff", price: 79, img: "/images/veg-puff.jpg" },
  { id: 15, name: "samosa", price: 169, img: "/images/samosa.webp" },
  { id: 16, name: "chakka", price: 129, img: "/images/chakka.jpeg" },
  { id: 17, name: "chekodi", price: 159, img: "/images/chekodi.jpeg" },
  { id: 18, name: "pappu chekodi", price: 119, img: "/images/pappu chekodi.jpeg" },
  { id: 19, name: "palli chekka", price: 139, img: "/images/palli chekka.jpeg" },
  { id: 20, name: "Veg Pakora", price: 89, img: "/images/veg pakora.jpg" },
  { id: 21, name: "popcorn", price: 229, img: "/images/popcorn.jpeg" },
  { id: 22, name: "rings", price: 249, img: "/images/rings.jpeg" },
  { id: 23, name: "punugullu", price: 149, img: "/images/punugullu.jpeg" },
  { id: 24, name: "vada", price: 199, img: "/images/vada.jpeg" },
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
