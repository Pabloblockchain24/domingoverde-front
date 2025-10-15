export default function FeaturedItem({ img, title, price, category }) {
  return (
    <div className="featured-item">
      <div className="category-badge">{category}</div>
      <img src={img} alt={title} loading="lazy" />
      <h3>{title}</h3>
      <p className="price">${price.toLocaleString("es-CL")}</p>
    </div>
  );
}