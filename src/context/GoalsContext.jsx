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
       
    const updateGoals = async (metas) => {
        setLoading(true);
        try {
            const res = await updateGoalByApi(metas);
            setGoals(res.data)
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    return (
      <GoalsContext.Provider
        value={{ goals, loading, getGoals, updateGoals }}
      >
        {children}
      </GoalsContext.Provider>
    );

} 