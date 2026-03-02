import Navbar from "../Navbar";
import Footer from "../Footer";

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-bgLight">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
