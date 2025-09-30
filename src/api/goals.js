import axios from "./axios"

export const getGoalsByApi = () => axios.get("/goals")
export const updateGoalByApi = (goalId, data) => axios.patch(`/goals/${goalId}`, data)