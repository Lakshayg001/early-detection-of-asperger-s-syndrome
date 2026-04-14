import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Breadcrumbs from './Breadcrumbs';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background aurora-bg">
      <Navbar />
      <main className="max-w-7xl mx-auto px-8 pt-32 pb-48">
        <Breadcrumbs />
        <Outlet />
      </main>
      
      {/* Visual background decorators moved to Layout to be consistent */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-accent/3 rounded-full blur-[80px]" />
      </div>
    </div>
  );
};

export default Layout;
