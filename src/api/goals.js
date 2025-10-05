import axios from "./axios"

export const getGoalsByApi = () => axios.get(`/goals`)
export const updateGoalByApi = (metas) => axios.put(`/goals`, metas)