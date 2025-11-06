import { Star } from "lucide-react";

export default function LanderReviewItem({ review }) {
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
    <div className="landing-review-item">
      <div className="landing-review-image-container">
        <img
          src={photo ? photo : "/error_img.jpg"}
          alt={`Foto del producto reseñado por ${name}`}
          onError={(e) => {
            e.target.onerror = null; // evita bucle infinito
            e.target.src = "/error_img.jpg";
          }}
        />
      </div>
      <div className="landing-review-content">
        <div className="landing-review-item-stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`star ${i < rating ? "active" : ""}`} />
          ))}
        </div>

        <p className="landing-review-text">"{comment}"</p>

        <div className="landing-review-author">
          <p className="name">{name}</p>
          <p className="date">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
