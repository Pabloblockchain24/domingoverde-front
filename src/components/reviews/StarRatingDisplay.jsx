// src/components/StarRatingDisplay.jsx
import { Star } from "lucide-react";

const StarRatingDisplay = ({ rating }) => {
  // Aseguramos que el rating sea un número entero para el display
  const roundedRating = Math.round(rating); 
  
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= roundedRating;

    return (
      <Star
        key={index}
        className={`star-icon ${isFilled ? 'filled' : 'empty'}`}
        size={16} // Tamaño ajustado para los botones de filtro
        fill={isFilled ? 'gold' : 'none'} // Relleno dorado si está lleno
        stroke={isFilled ? 'gold' : '#ccc'} // Borde gris claro si está vacío
      />
    );
  });

  return (
    <span 
        className="star-rating-display"
        aria-label={`${roundedRating} estrellas`}
        role="img"
    >
      {stars}
    </span>
  );
};

export default StarRatingDisplay;