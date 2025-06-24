
import { Outlet } from "react-router-dom";
import NgoSidebar from "./NgoSidebar";
import NgoHeader from "./NgoHeader";

const NgoLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex pl-64">
        <NgoSidebar />
        <div className="flex-1 flex flex-col">
          <NgoHeader />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default NgoLayout;
