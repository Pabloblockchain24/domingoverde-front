import { useState, useEffect } from "react";
import MarketingTable from "./MarketingTable";
import MarketingCards from "./MarketingCard";
import MarketingModal from "./MarketingModal";
import Loader from "../../../loader";
import { useCampaigns } from "../../../../context/CampaignsContext";

export default function Marketing() {
  const {
    campaigns,
    getCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    loading,
  } = useCampaigns();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [campañaAEditar, setCampañaAEditar] = useState(null);

  // Cargar campañas desde backend
  useEffect(() => {
    getCampaigns();
  }, []);

  const abrirModal = (campaña = null) => {
    setCampañaAEditar(campaña);
    setModalAbierto(true);
  };


  const cerrarModal = () => {
    setCampañaAEditar(null);
    setModalAbierto(false);
  };

  const guardarCampaña = async (campañaNueva) => {
    try {
      if (campañaNueva._id) {
        await updateCampaign(campañaNueva._id, campañaNueva);
      } else {
        await createCampaign(campañaNueva);
      }
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar campaña:", error);
    }
  };

  const eliminarCampaña = async (id) => {
    try {
      await deleteCampaign(id);
    } catch (error) {
      console.error("Error al eliminar campaña:", error);
    }
  };

 return (
    <div className="marketing">
      <h2>Marketing</h2>
      <button onClick={() => abrirModal()}>+ Crear Campaña</button>

      {loading ? (
        <div className="loader-wrapper">
          <Loader size={60} color="#2e7d32" />
        </div>
      ) : (
        <>
          <MarketingTable
            campañas={campaigns}
            onEditar={abrirModal}
            onEliminar={eliminarCampaña}
          />
          <MarketingCards
            campañas={campaigns}
            onEditar={abrirModal}
            onEliminar={eliminarCampaña}
          />
        </>
      )}

      {modalAbierto && (
        <MarketingModal
          campañaAEditar={campañaAEditar}
          onClose={cerrarModal}
          onGuardar={guardarCampaña}
        />
      )}
    </div>
  );
}