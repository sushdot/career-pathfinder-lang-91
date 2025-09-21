import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface MainLayoutProps {
  children: ReactNode;
  showNav?: boolean;
  showFooter?: boolean;
}

const MainLayout = ({ children, showNav = true, showFooter = true }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showNav && <Navigation />}
      <main className={`flex-1 ${showNav ? 'pt-16' : ''}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;