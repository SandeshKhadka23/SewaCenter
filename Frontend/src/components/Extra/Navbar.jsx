import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Wrench, Menu, X, Users } from 'lucide-react';
import { useState } from 'react';
import Logo from '../../assets/images/sewacenterlogo.png';

const navLinks = [
    { to: '/dashboard', label: 'Home', icon: Home },
    { to: '/dashboard/categories', label: 'Categories', icon: Wrench },
    { to: '/dashboard/providers', label: 'Providers', icon: Users },
    { to: '/dashboard/bookings', label: 'My Bookings', icon: ClipboardList },
];

export default function Navbar() {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path) =>
        path === '/dashboard' ? location.pathname === '/dashboard' || location.pathname === '/dashboard/' : location.pathname.startsWith(path);

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/dashboard" className="flex items-center shrink-0">
                        <img src={Logo} alt="SewaCenter logo" className="h-10 w-auto" />
                    </Link>

                    <nav className="hidden md:flex items-center gap-1 ml-auto">
                        {navLinks.map(({ to, label, icon: Icon }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(to)
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                            </Link>
                        ))}
                    </nav>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {mobileOpen && (
                    <div className="md:hidden border-t border-slate-200 py-3 space-y-2">
                        {navLinks.map(({ to, label, icon: Icon }) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${isActive(to) ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}
