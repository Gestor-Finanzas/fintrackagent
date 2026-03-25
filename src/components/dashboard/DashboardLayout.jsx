import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-dash-bg flex flex-col">
      <DashboardNavbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 sm:pb-6">
        <Outlet />
      </main>
    </div>
  );
}
