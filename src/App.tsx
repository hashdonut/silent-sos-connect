
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Alerts from "./pages/Alerts";
import NGODirectory from "./pages/NGODirectory";
import NGODetails from "./pages/NGODetails";
import Announcements from "./pages/Announcements";
import Donations from "./pages/Donations";
import Login from "./pages/Login";
import ManageNGOs from "./pages/ManageNGOs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="ngo-directory" element={<NGODirectory />} />
            <Route path="ngo/:id" element={<NGODetails />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="donations" element={<Donations />} />
            <Route path="manage-ngos" element={<ManageNGOs />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
