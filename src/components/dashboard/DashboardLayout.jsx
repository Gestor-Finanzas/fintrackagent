import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNavbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 sm:pb-10">
        <Outlet />
      </main>
    </div>
  );
}
