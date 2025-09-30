import { useEffect } from "react";
import LoginPage from "./LoginPage";
import AdminDashboard from "./AdminDashboard";
import Loader from "../loader";

// Import context providers
import { OrdersProvider } from "../../context/OrdersContext";
import { PurchasesProvider } from "../../context/PurchasesContext";
import { GoalsProvider } from "../../context/GoalsContext";
import { CampaignsProvider } from "../../context/CampaignsContext";
import { AuthProvider, useAuth } from "../../context/AuthContext";

function AdminAppContent() {
  const { isAuthenticated, verifyToken, loading } = useAuth();

  useEffect(() => {
    verifyToken(); // 🔑 chequear sesión al cargar
  }, []);

  if (loading) return <Loader />; 

  return (
    <div className="admin-app">
      {isAuthenticated ? <AdminDashboard /> : <LoginPage />}
    </div>
  );
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <PurchasesProvider>
          <GoalsProvider>
            <CampaignsProvider>
              <AdminAppContent />
            </CampaignsProvider>
          </GoalsProvider>
        </PurchasesProvider>
      </OrdersProvider>
    </AuthProvider>
  );
}
