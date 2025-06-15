// AppRoutes.tsx
import { useAuth } from "@/contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
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

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();
  console.log("User in AppRoutes:", user);

  return (
    <Routes>
      {!isAuthenticated && (
        <>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ngo/register" element={<NgoRegister />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </>
      )}

      <Route element={<RoleProtectedRoute allowedRoles={["ordinary"]} />}>
        <Route path="/" element={<PublicLayout />}>
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
        <Route element={<Layout />}>
          {/* NGO Admin routes */}
        </Route>
      </Route>

      <Route path="/ngo" element={<RoleProtectedRoute allowedRoles={["ngo"]} />}>
        <Route element={<Layout />}>
          {/* NGO routes */}
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
