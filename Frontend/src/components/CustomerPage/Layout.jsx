import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
    return (
        <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#f8fafc_0%,#f8fbff_100%)] text-slate-900">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
