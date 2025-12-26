
import React, { useState } from "react";
import "./veg.css";
import { useCart } from "./CartContext";

const vegItems = [
  { id: 1, name: "full biryani", price: 199, img: "/images/full biriyani.jpg" },
  { id: 2, name: "crab fry", price: 179, img: "/images/crab friy.jpg" },
  { id: 3, name: "corramenu pullusu", price: 149, img: "/images/corramenu.jpeg" },
  { id: 4, name: "chicken biryani", price: 129, img: "/images/chicken biriyani.jpg" },
  { id: 5, name: "Cheese chicken", price: 199, img: "/images/chekenboles.jpeg" },
  { id: 6, name: "gongura chicken", price: 99, img: "/images/gongura chekan.webp" },
  { id: 10, name: "fish curry", price: 159, img: "/images/fish.webp" },
  { id: 9, name: "Mutton Curry", price: 209, img: "/images/mashroom curry.jpg" },
  { id: 7, name: "Spring Rolls", price: 89, img: "/images/spring roll.jpg" },
  { id: 8, name: "Chicken Sandwich", price: 119, img: "/images/veg sandwich.jpg" },
  { id: 11, name: "chicken Momos", price: 99, img: "/images/veg momos.webp" },
  { id: 12, name: "fish fry", price: 89, img: "/images/fish fry.jpg" },
  { id: 13, name: "full biriyani", price: 149, img: "/images/full biriyani.jpg" },
  { id: 14, name: "gongura chicken", price: 79, img: "/images/gongura chekan.webp" },
  { id: 15, name: "hyderabad dam biriyani", price: 169, img: "/images/hyderabad dam biriyani.jpeg" },
  { id: 16, name: "mutton curry", price: 129, img: "/images/Mutton-Masala.jpg" },
  { id: 17, name: "nelluri chapala pulusu", price: 159, img: "/images/nelluru.jpg" },
  { id: 18, name: "royyala pulusu", price: 119, img: "/images/royyala pulusu.jpeg" },
  { id: 19, name: "royyala fry", price: 139, img: "/images/royyallu fry.webp" },
  { id: 20, name: "chicken Pakora", price: 89, img: "/images/veg pakora.jpg" },
  { id: 21, name: "Chicken Pizza", price: 229, img: "/images/veg pizza.jpg" },
  { id: 22, name: "thanduri Butter Masala", price: 249, img: "/images/thanduri.jpg" },
  { id: 23, name: "lolipop", price: 149, img: "/images/lolipop.webp" },
  { id: 24, name: "full thanduri", price: 199, img: "/images/full biriyani.jpg" },
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
