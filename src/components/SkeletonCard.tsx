export default function SkeletonCard() {
  return (
    <div className="card skeleton-card">
      <div className="skeleton skeleton-image"></div>

      <div className="skeleton skeleton-badge"></div>

      <div className="skeleton skeleton-title"></div>

      <div className="skeleton skeleton-price"></div>

      <div className="card-actions">
        <div className="skeleton skeleton-btn"></div>
        <div className="skeleton skeleton-btn"></div>
      </div>
    </div>
  );
}