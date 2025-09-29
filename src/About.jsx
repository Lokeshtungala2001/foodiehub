// About.jsx
import React from "react";

function About() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          textAlign: "center",
          padding: "80px 20px",
        }}
      >
        <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>About Us</h1>
        <p style={{ fontSize: "18px", maxWidth: "700px", margin: "0 auto" }}>
          Welcome to <b>Foodie World</b> — where passion meets flavor.  
          We serve happiness on your plate, every single day.
        </p>
      </section>

      {/* Who We Are */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ color: "#d35400", fontSize: "28px", marginBottom: "20px" }}>
          Who We Are
        </h2>
        <p style={{ maxWidth: "800px", margin: "0 auto", fontSize: "16px" }}>
          We are a team of food lovers, chefs, and dreamers who believe that food is not
          just about taste — it’s about creating memories.  
          From farm-fresh ingredients to carefully crafted recipes, we bring
          you meals that are delicious, healthy, and unforgettable.
        </p>
      </section>

      {/* Mission & Vision */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          padding: "60px 20px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {[
          {
            title: "🍴 Our Mission",
            text: "To deliver fresh, tasty, and nutritious meals to our customers while supporting local farmers and promoting sustainable food practices.",
          },
          {
            title: "🌍 Our Vision",
            text: "To become the most trusted and loved food brand that inspires healthier lifestyles while keeping the joy of food alive for everyone.",
          },
        ].map((card, index) => (
          <div
            key={index}
            style={{
              background: "#fef5e7",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease-in-out",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
            }}
          >
            <h3 style={{ color: "#e67e22", marginBottom: "10px" }}>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </section>

      {/* Real-Time Stats */}
      <section
        style={{
          background: "#fdf2e9",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#d35400", marginBottom: "30px" }}>
          Our Journey in Numbers
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "50px",
            flexWrap: "wrap",
          }}
        >
          {[
            { number: "10K+", label: "Happy Customers" },
            { number: "500+", label: "Fresh Dishes Served" },
            { number: "50+", label: "Dedicated Chefs" },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h3 style={{ fontSize: "28px", color: "#e67e22" }}>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ color: "#d35400", marginBottom: "30px" }}>Meet Our Team</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {[
            {
              name: "Chef Rahul",
              role: "Head Chef",
              img: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Priya Sharma",
              role: "Operations Manager",
              img: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
              name: "Aman Verma",
              role: "Delivery Head",
              img: "https://randomuser.me/api/portraits/men/76.jpg",
            },
          ].map((member, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
              }}
            >
              <img
                src={member.img}
                alt={member.name}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  marginBottom: "15px",
                  transition: "all 0.3s ease",
                }}
              />
              <h4 style={{ marginBottom: "5px" }}>{member.name}</h4>
              <p style={{ fontSize: "14px", color: "#555" }}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section
        style={{
          background: "#e67e22",
          color: "#fff",
          textAlign: "center",
          padding: "60px 20px",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>Join Our Foodie Family</h2>
        <p style={{ marginBottom: "25px" }}>
          Order now and taste the passion behind every dish!
        </p>
        <a
          href="/home"
          style={{
            background: "#fff",
            color: "#e67e22",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#d35400";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#e67e22";
          }}
        >
          Explore Menu
        </a>
      </section>
    </div>
  );
}

export default About;
