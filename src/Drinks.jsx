
import React, { useState } from "react";
import "./veg.css";
import { useCart } from "./CartContext";

const vegItems = [
  { id: 1, name: "abc", price: 199, img: "/images/abc.jpeg" },
  { id: 2, name: "apple", price: 179, img: "/images/apple.jpg" },
  { id: 3, name: "banana", price: 149, img: "/images/banana.jpeg" },
  { id: 4, name: "baress", price: 129, img: "/images/baress.jpg" },
  { id: 5, name: "betrot", price: 199, img: "/images/betrot.jpeg" },
  { id: 6, name: "Salad Bowl", price: 99, img: "/images/salad bowl.jpg" },
  { id: 7, name: "carrot", price: 89, img: "/images/carrot.jpeg" },
  { id: 8, name: "danimma", price: 119, img: "/images/danimma.jpeg" },
  { id: 9, name: "dragon fruit", price: 209, img: "/images/dragon.jpeg" },
  { id: 10, name: "drinks", price: 159, img: "/images/drinks.webp" },
  { id: 11, name: "grapes", price: 99, img: "/images/grap.jpeg" },
  { id: 12, name: "kiwi", price: 89, img: "/images/kiwi.webp" },
  { id: 13, name: "leche", price: 149, img: "/images/leche.jpeg" },
  { id: 14, name: "lemon", price: 79, img: "/images/lemon.jpeg" },
  { id: 15, name: "mango", price: 169, img: "/images/mango.jpeg" },
  { id: 16, name: "orange", price: 129, img: "/images/orenge.jpeg" },
  { id: 17, name: "pineapple", price: 159, img: "/images/pineapple.avif" },
  { id: 18, name: "papaya", price: 119, img: "/images/popaya.jpeg" },
  { id: 19, name: "salad bowl", price: 139, img: "/images/salad bowl.jpg" },
  { id: 20, name: "abc", price: 89, img: "/images/abc.jpeg" },
  { id: 21, name: "banana", price: 229, img: "/images/banana.jpeg" },
  { id: 22, name: "dragon fruit", price: 249, img: "/images/dragon.jpeg" },
  { id: 23, name: "grapes", price: 149, img: "/images/grap.jpeg" },
  { id: 24, name: "mango", price: 199, img: "/images/mango.jpeg" },
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
