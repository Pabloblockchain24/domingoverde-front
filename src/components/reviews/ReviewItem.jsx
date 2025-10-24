import { Star } from "lucide-react";

export default function ReviewItem({ review }) {
  const { name, date, rating, comment, photo } = review;

  const formattedDate = new Date(date)
    .toLocaleDateString("es-CL", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(".", "")
    .toLowerCase();

  return (
    <div className="review-item">
      <div className="review-item__image">
        <img
          src={photo}
          alt={`Foto del producto reseñado por ${name}`}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src =
              "./error_img.jpg";
          }}
        />
      </div>
      <div className="review-item__content">
        {/* Estrellas */}
        <div className="review-item__stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`star ${i < rating ? "active" : ""}`} />
          ))}
        </div>

        {/* Comentario */}
        <p className="review-item__comment">"{comment}"</p>

        {/* Info cliente */}
        <div className="review-item__footer">
          <p className="name">{name}</p>
          <p className="date">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
