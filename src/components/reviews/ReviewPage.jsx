import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { User, Package, MessageSquare, Star, Image } from "lucide-react";
import { useReviews } from "../../context/ReviewsContext";

export default function ReviewPage() {
  const { getReviewByToken, createReview, loading } = useReviews();
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const MAX_FILE_SIZE_MB = 2; // Máximo permitido en Megabytes
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // 2 MB en bytes

  const [review, setReview] = useState({
    name: "",
    rating: 0,
    comment: "",
    product: "",
    photo: "",
    token: "",
    orderId: "",
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("token");

    if (!tokenFromURL) {
      setTokenValid(false);
      return;
    }

    setReview((prev) => ({ ...prev, token: tokenFromURL }));

    // Consultar al backend usando el contexto
    getReviewByToken(tokenFromURL)
      .then((data) => {
        if (data?.productos?.length > 0) {
          setReview((prev) => ({
            ...prev,
            product: data.productos.join(", "),
            orderId: data.orderId,
            name: data.nombre || "",
          }));
          setTokenValid(true);
        } else {
          setTokenValid(false);
        }
      })
      .catch(() => setTokenValid(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleStarClick = (value) => {
    setReview({ ...review, rating: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setReview({ ...review, photo: "" }); // Limpiar si no se seleccionó nada
      return;
    }

    // 🚨 Validación principal: verificar el tamaño
    if (file.size > MAX_FILE_SIZE_BYTES) {
      Swal.fire({
        icon: "error",
        title: "Archivo demasiado grande 🖼️",
        text: `El tamaño máximo permitido es ${MAX_FILE_SIZE_MB} MB. Tu archivo es de ${(
          file.size /
          1024 /
          1024
        ).toFixed(2)} MB.`,
      });
      // Limpiar el valor del input para que el usuario pueda volver a intentar subir
      e.target.value = null;
      return;
    }

    // Si la validación es exitosa, actualizar el estado
    setReview({ ...review, photo: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review.rating || !review.comment.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, selecciona una calificación y escribe un comentario.",
      });
      return;
    }
    if (review.photo instanceof File && review.photo.size > MAX_FILE_SIZE_BYTES) {
        Swal.fire({
            icon: "error",
            title: "Error de validación",
            text: `La foto seleccionada excede el límite de ${MAX_FILE_SIZE_MB} MB.`,
        });
        return;
    }

    try {
      const formData = new FormData();
      formData.append("name", review.name);
      formData.append("rating", review.rating);
      formData.append("comment", review.comment);
      formData.append("orderId", review.orderId);
      formData.append("product", review.product);

      if (review.photo instanceof File) {
        formData.append("photo", review.photo);
      }

      await createReview(formData);

      Swal.fire({
        title: "¡Gracias por tu reseña! 💬",
        text: "Tu comentario fue enviado con éxito.",
        icon: "success",
        confirmButtonColor: "#bd8905",
        confirmButtonText: "Volver al inicio",
      }).then(() => (window.location.href = "/"));

      setReview({ ...review, comment: "", rating: 0, photo: "" });
      setHoverRating(0);
    } catch (error) {
      console.error("❌ Error al crear la reseña:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar la reseña. Inténtalo más tarde.",
      });
    }
  };

  // Mostrar cargando
  if (loading) {
    return (
      <div className="review-container">
        <main className="review-page">
          <p>Cargando información...</p>
        </main>
      </div>
    );
  }

  // Token inválido o expirado
  if (!tokenValid) {
    return (
      <div className="review-container">
        <main className="review-page">
          <h2 className="title">Reseña no disponible</h2>
          <p>El tiempo para hacer la reseña ha expirado.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="review-container">
      <main className="review-page">
        <h2 className="title">Deja tu Reseña</h2>

        <form onSubmit={handleSubmit} className="review-form">
          {/* Nombre */}
          <div className="input-group">
            <User className="icon" />
            <input
              type="text"
              name="name"
              placeholder="Ej. Pablo A."
              value={review.name}
              onChange={handleChange}
              disabled
            />
          </div>

          {/* Producto */}
          <div className="input-group">
            <Package className="icon" />
            <input
              type="text"
              name="product"
              placeholder="Producto"
              value={review.product}
              disabled
            />
          </div>

          {/* Comentario */}
          <div className="input-group textarea-group">
            <MessageSquare className="icon" />
            <textarea
              name="comment"
              placeholder="Escribe tu comentario..."
              rows="4"
              value={review.comment}
              onChange={handleChange}
              required
            />
          </div>

          {/* Subir o tomar foto */}
          <div className="input-group photo-group">
            <label className="photo-label">
              {" "}
              Toma o sube una foto (opcional):
            </label>
            <div className="photo-buttons">
              <button
                type="button"
                className="photo-btn"
                onClick={() => cameraInputRef.current.click()}
              >
                📷 Tomar foto
              </button>
              <button
                type="button"
                className="photo-btn"
                onClick={() => galleryInputRef.current.click()}
              >
                🖼 Ir a galería
              </button>
            </div>

            {/* Inputs ocultos */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange} 
            />

            {/* Vista previa */}
            {review.photo && review.photo instanceof File && (
              <div className="photo-preview">
                <img
                  src={URL.createObjectURL(review.photo)}
                  alt="Vista previa"
                />
              </div>
            )}
          </div>

          {/* Calificación */}
          <div className="input-group stars-group">
            <p className="stars-label">Calificación:</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  size={24}
                  style={{ cursor: "pointer" }}
                  fill={
                    n <= (hoverRating || review.rating) ? "#FFD700" : "none"
                  }
                  stroke={
                    n <= (hoverRating || review.rating) ? "#FFD700" : "#ccc"
                  }
                  onMouseEnter={() => setHoverRating(n)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleStarClick(n)}
                />
              ))}
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Enviar Reseña
          </button>
        </form>
      </main>
    </div>
  );
}
