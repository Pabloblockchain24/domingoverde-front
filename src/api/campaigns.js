/*import axios*/
import axios from "./axios";

export const getCampaignsByApi = () => axios.get("/campaigns");
export const createCampaignByApi = (data) => axios.post("/campaigns", data);
export const updateCampaignByApi = (campaignId, data) => axios.patch(`/campaigns/${campaignId}`, data);
export const deleteCampaignByApi = (campaignId) => axios.delete(`/campaigns/${campaignId}`);
