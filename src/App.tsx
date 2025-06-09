
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PublicLayout from "./components/PublicLayout";
import Index from "./pages/Index";
import Alerts from "./pages/Alerts";
import NGODirectory from "./pages/NGODirectory";
import NGODetails from "./pages/NGODetails";
import Announcements from "./pages/Announcements";
import Donations from "./pages/Donations";
import Login from "./pages/Login";
import ManageNGOs from "./pages/ManageNGOs";
import PublicHome from "./pages/public/PublicHome";
import PublicNGODirectory from "./pages/public/PublicNGODirectory";
import PublicNGODetails from "./pages/public/PublicNGODetails";
import PublicDonations from "./pages/public/PublicDonations";
import PublicAnnouncements from "./pages/public/PublicAnnouncements";
import HelpForm from "./pages/public/HelpForm";
import DonationManagement from "./pages/DonationManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin/NGO Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="ngo-directory" element={<NGODirectory />} />
            <Route path="ngo/:id" element={<NGODetails />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="donations" element={<Donations />} />
            <Route path="donation-management" element={<DonationManagement />} />
            <Route path="manage-ngos" element={<ManageNGOs />} />
          </Route>
          
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<PublicHome />} />
            <Route path="ngos" element={<PublicNGODirectory />} />
            <Route path="ngo/:id" element={<PublicNGODetails />} />
            <Route path="donate" element={<PublicDonations />} />
            <Route path="announcements" element={<PublicAnnouncements />} />
            <Route path="help" element={<HelpForm />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
