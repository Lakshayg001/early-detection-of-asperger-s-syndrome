import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') return null;

  return (
    <nav className="flex px-5 py-3 text-muted-foreground bg-white/40 backdrop-blur-md rounded-2xl border border-primary/5 w-fit mb-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">
            <Home className="w-3 h-3 mr-2" />
            Hub
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <li key={to}>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-muted-foreground/30" />
                <Link
                  to={to}
                  className={`ml-1 text-xs font-black uppercase tracking-widest transition-colors ${
                    last ? 'text-primary' : 'hover:text-primary'
                  }`}
                >
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
