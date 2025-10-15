export default function FeaturedItem({ img, title, price, category }) {

    const categoryClass = category.toLowerCase().replace(/\s+/g, "-");


  return (
    <div className="featured-item">
      <div className={`category-badge ${categoryClass}`}>{category}</div>
      <img src={img} alt={title} loading="lazy" />
      <h3>{title}</h3>
      <p className="price">${price.toLocaleString("es-CL")}</p>
    </div>
  );
}