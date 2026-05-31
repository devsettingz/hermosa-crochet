export default function HomePage() {
  return (
    <div style={{ background: "#0a0a0a", color: "#F5F0EB", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", color: "#D4A574" }}>Hermosa Crochet</h1>
        <p style={{ color: "#888", marginTop: "1rem" }}>If you see this, the page is working.</p>
        <a href="/shop" style={{ color: "#D4A574", display: "block", marginTop: "2rem" }}>Go to Shop</a>
      </div>
    </div>
  );
}