import { useAuth } from "@/contexts/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";

import Layout from "./Layout";
import PublicLayout from "./PublicLayout";
import Index from "../pages/Index";
import Alerts from "../pages/Alerts";
import NGODirectory from "../pages/NGODirectory";
import NGODetails from "../pages/NGODetails";
import Announcements from "../pages/Announcements";
import Donations from "../pages/Donations";
import DonationManagement from "../pages/DonationManagement";
import ManageNGOs from "../pages/ManageNGOs";
import PublicHome from "../pages/public/PublicHome";
import PublicNGODirectory from "../pages/public/PublicNGODirectory";
import PublicNGODetails from "../pages/public/PublicNGODetails";
import PublicDonations from "../pages/public/PublicDonations";
import PublicAnnouncements from "../pages/public/PublicAnnouncements";
import HelpForm from "../pages/public/HelpForm";
import UserLogin from "../pages/auth/UserLogin";
import Register from "../pages/auth/Register";
import Login from "../pages/Login";
import Unauthorized from "@/pages/Unauthorized";
import NotFound from "../pages/NotFound";
import NgoRegister from "../pages/auth/NgoRegister";
import NGODashboard from "@/pages/ngo/NGODashboard";
import NgoLayout from "./NgoLayout";
import NgoAlerts from "@/pages/ngo/NgoAlerts";
import Helpers from "@/pages/ngo/Helpers";
import NgoAnnouncements from "@/pages/ngo/NgoAnnouncements";

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();
  const role = user?.role;

  // Redirect based on role
  const getRedirectForRole = () => {
    switch (role) {
      case "admin":
        return <Navigate to="/admin" replace />;
      case "ngo_admin":
        return <Navigate to="/ngo-admin" replace />;
      case "ngo":
        return <Navigate to="/ngo" replace />;
      case "ordinary":
        return <Navigate to="/" replace />;
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  };

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ngo/register" element={<NgoRegister />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<RoleProtectedRoute allowedRoles={["ordinary"]} />}>
            <Route element={<PublicLayout />}>
              <Route index element={<PublicHome />} />
              <Route path="ngos" element={<PublicNGODirectory />} />
              <Route path="ngo/:id" element={<PublicNGODetails />} />
              <Route path="donate" element={<PublicDonations />} />
              <Route path="announcements" element={<PublicAnnouncements />} />
              <Route path="help" element={<HelpForm />} />
            </Route>
          </Route>

          <Route path="/admin" element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
            <Route element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="ngo-directory" element={<NGODirectory />} />
              <Route path="ngo/:id" element={<NGODetails />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="donations" element={<Donations />} />
              <Route path="donation-management" element={<DonationManagement />} />
              <Route path="manage-ngos" element={<ManageNGOs />} />
            </Route>
          </Route>

          <Route path="/ngo-admin" element={<RoleProtectedRoute allowedRoles={["ngo_admin"]} />}>
            <Route element={<NgoLayout />}>
              {/* NGO Admin routes */}
              <Route index element={<NGODashboard />} />
              <Route path="alerts" element={<NgoAlerts />} />
              <Route path="users" element={<Helpers />} />
              <Route path="announcements" element={<NgoAnnouncements />} />
            </Route>
          </Route>

          <Route path="/ngo" element={<RoleProtectedRoute allowedRoles={["ngo"]} />}>
            <Route element={<Layout />}>
              {/* NGO routes */}
              <Route index element={<h1>NGO Dashboard</h1>} />
            </Route>
          </Route>

          {/* Default route for authenticated users */}
          <Route path="*" element={getRedirectForRole()} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
