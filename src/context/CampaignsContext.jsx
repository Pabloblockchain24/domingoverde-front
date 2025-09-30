import { createContext, useContext, useState } from "react";
import {
  getCampaignsByApi,
  createCampaignByApi,
  updateCampaignByApi,
  deleteCampaignByApi,
} from "../api/campaigns";

const CampaignsContext = createContext();
export const useCampaigns = () => {
  const context = useContext(CampaignsContext);
  if (!context)
    throw new Error("useCampaigns must be used within a GoalsProvider");
  return context;
};

export const CampaignsProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCampaigns = async () => {
    setLoading(true);
    try {
      const res = await getCampaignsByApi();
      setCampaigns(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const createCampaign = async (data) => {
    setLoading(true);
    try {
      const res = await createCampaignByApi(data);
      setCampaigns((prev) => [...prev, res.data]);
      return res.data;
    } catch (error) {
      console.error("Error al crear campaña:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCampaign = async (campaignId, data) => {
    setLoading(true);
    try {
      const res = await updateCampaignByApi(campaignId, data);
      setCampaigns((prev) =>
        prev.map((c) => (c._id === campaignId ? res.data : c))
      );
      return res.data;
    } catch (error) {
      console.error("Error al actualizar campaña:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteCampaign = async (campaignId) => {
    setLoading(true);
    try {
      await deleteCampaignByApi(campaignId);
      setCampaigns((prev) => prev.filter((c) => c._id !== campaignId));
    } catch (error) {
      console.error("Error al eliminar campaña:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CampaignsContext.Provider
      value={{
        campaigns,
        getCampaigns,
        createCampaign,
        updateCampaign,
        deleteCampaign,
        loading,
      }}
    >
      {children}
    </CampaignsContext.Provider>
  );
};
