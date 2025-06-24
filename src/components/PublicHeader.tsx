
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, Heart, Users, Calendar, HelpCircle } from "lucide-react";
import { logoutUser } from "@/api/auth";

const PublicHeader = () => {
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Shield },
    { name: "Find NGOs", href: "/ngos", icon: Users },
    { name: "Donate", href: "/donate", icon: Heart },
    { name: "Announcements", href: "/announcements", icon: Calendar },
    // { name: "Get Help", href: "/help", icon: HelpCircle },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SilentSOS+</h1>
              <p className="text-xs text-gray-600">Emergency Support Network</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <Button variant="outline" onClick={() => logoutUser()}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
