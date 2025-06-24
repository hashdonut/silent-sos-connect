import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Bell,
  Users,
  Calendar,
  Map,
  Heart,
  Settings,
} from "lucide-react";
import { logoutUser } from "@/api/auth";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Map },
  { name: "Real-time Alerts", href: "/admin/alerts", icon: Bell },
  { name: "NGO Directory", href: "/admin/ngo-directory", icon: Users },
  { name: "Announcements", href: "/admin/announcements", icon: Calendar },
  { name: "Donations", href: "/admin/donations", icon: Heart },
  { name: "Manage NGOs", href: "/admin/manage-ngos", icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg h-screen z-40">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
          <h1 className="text-xl font-bold text-white">SilentSOS+</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={logoutUser}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">Admin Panel v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
