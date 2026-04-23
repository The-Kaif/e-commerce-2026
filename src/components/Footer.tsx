
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>ShopKart</h3>
        <span>
          © {year} ShopKart. All rights reserved.
        </span>
      </div>
    </footer>
  );
}