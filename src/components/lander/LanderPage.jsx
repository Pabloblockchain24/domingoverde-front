import LanderReviewList from "./LanderReviews/LanderReviewList.jsx";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LockOutlineIcon from "@mui/icons-material/LockOutline";

export default function LanderPage() {
  return (
    <div className="landing-container">
      <section className="landing-banner-header">
        <div>
          <img src="/header_banner.png" alt="Banner de domingo verde" />
        </div>
      </section>

      <section className="landing-hero-section">
        <img src="/lander_banner.jpg" alt="Imagen de paltas" srcset="" />
        <div className="landing-hero-section-content-container">
          <div className="landing-hero-section-content">
            <p>¡Nunca más una palta negra!</p>
            <h2>Asegura calidad con Hass Domingo Verde</h2>
            <ul>
              <li> ✔ Más cremosas </li>
              <li> ✔ Más barato </li>
              <li> ✔ Más fácil de comprar </li>
            </ul>
          </div>
          <a
            href="/checkout?title=palta-hass-3kg"
            className="landing-hero-section-cta-button"
          >
            👉 Quiero Mis Paltas Ahora
          </a>
        </div>
      </section>

      <section className="landing-benefits-section">
        <div className="benefit-card">
          <span className="benefit-icon">
            <AttachMoneyIcon sx={{ fontSize: 35, color: "black" }} />
          </span>
          <h3 className="benefit-title">Palta premium al mejor precio</h3>
          <p className="benefit-description">
            Directo desde el campo a tu mesa.
          </p>
        </div>

        <div className="benefit-card">
          <span className="benefit-icon">
            <LocalShippingIcon sx={{ fontSize: 35, color: "black" }} />
          </span>
          <h3 className="benefit-title">Envío Gratis y rápido a tu casa</h3>
          <p className="benefit-description">
            Delivery gratis en Llolleo, San Antonio, Santo Domingo y Cartagena.
          </p>
        </div>

        <div className="benefit-card">
          <span className="benefit-icon">
            <LockOutlineIcon sx={{ fontSize: 35, color: "black" }} />
          </span>
          <h3 className="benefit-title">Garantía 'Domingo verde'</h3>
          <p className="benefit-description">
            Si una palta sale mala, te la reponemos o te devolvemos el dinero.
          </p>
        </div>
      </section>
      {/* SOCIAL PROOF SECTION */}
      <section className="landing-reviews-section">
        <h2 className="landing-section-title">
          ¿Que opinan nuestros clientes?
        </h2>
        <LanderReviewList />
      </section>
      {/* PRICING + CTA SECTION */}
      <section className="landing-pricing-section">
        <div className="landing-pricing-content">
          <div className="landing-pricing-cards">
            <div className="landing-pricing-card supermarket-card">
              <h3 className="landing-pricing-card-title">
                Palta Hass Supermercado
              </h3>
              <p className="landing-pricing-card-price">$5.490/kg </p>
              <p className="landing-pricing-card-description">
                Precio promedio por palta en supermercados de la zona.
              </p>
            </div>

            <div className="landing-pricing-card">
              <div className="landing-pricing-card-header">
                <img src="/productos/palta_3.jpg" alt="Palta hass 3kg" />
                <div>
                  <h3 className="landing-pricing-card-title">3kg Palta Hass</h3>
                  <p className="landing-pricing-card-price">
                    $9.990 ($3330/kg)
                  </p>
                  <p className="landing-pricing-card-description">
                    Delivery gratis en la zona
                  </p>
                </div>
              </div>

              <a
                id="landing-checkout-section"
                href="/checkout?title=palta-hass-3kg"
                className="landing-pricing-cta-button"
              >
                👉 Quiero Mis Paltas Ahora
              </a>
            </div>

            <div className="landing-pricing-card">
              <div className="landing-pricing-card-header">
                <img src="/productos/palta_1.jpg" alt="Palta hass 1kg" />
                <div>
                <h3 className="landing-pricing-card-title">1kg palta hass</h3>
                <p className="landing-pricing-card-price">$3.490/kg </p>
                <p className="landing-pricing-card-description">
                  Delivery $3,000 clp.
                </p>
                </div>

              </div>

              <a
                id="landing-checkout-section"
                href="/checkout?title=palta-hass-1kg"
                className="landing-pricing-cta-button"
              >
                👉 Quiero Mis Paltas Ahora
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
