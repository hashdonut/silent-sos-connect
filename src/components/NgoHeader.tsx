
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const NgoHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900 lg:ml-0 ml-12">
            NGO Emergency Response Dashboard
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button> */}
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Ngo Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NgoHeader;
