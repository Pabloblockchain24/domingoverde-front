import { createContext, useContext, useState } from "react";

import {
  getGoalsByApi,
  updateGoalByApi,
} from "../api/goals";

const GoalsContext = createContext();

export const useGoals = () => {
    const context = useContext(GoalsContext);
    if (!context)
      throw new Error("useGoals must be used within a GoalsProvider");
    return context;
  };
  
  export const GoalsProvider = ({ children }) => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(false);

    const getGoals = async () => {
        setLoading(true);
        try {
            const res = await getGoalsByApi();
            setGoals(res.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };
       
    const updateGoal = async (goalId, data) => {
        setLoading(true);
        try {
            const res = await updateGoalByApi(goalId, data);
            const updated = res.data;
            setGoals((prev) =>
                prev.map((g) => (g._id === goalId ? { ...g, ...updated } : g))
            );
            return updated;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    return (
      <GoalsContext.Provider
        value={{ goals, loading, getGoals, updateGoal }}
      >
        {children}
      </GoalsContext.Provider>
    );

} 