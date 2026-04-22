import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import { DashboardProvider } from "./hooks/DashboardContext";
import { ProfileProvider } from "../../contexts/ProfileContext";

export default function DashboardLayout() {
  return (
    <ProfileProvider>
      <DashboardProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <DashboardNavbar />
          {/* pb-28 deja margen sobre la barra inferior fija de 56px (h-14) en móvil
              para que el último elemento scrolleable no quede oculto. */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 sm:pb-12">
            <Outlet />
          </main>
        </div>
      </DashboardProvider>
    </ProfileProvider>
  );
}
