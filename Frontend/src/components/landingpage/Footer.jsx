import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Send, MessageCircle, ShieldCheck, ArrowUpRight } from 'lucide-react';

function Footer() {
    return (
        <footer className="mt-20 border-t border-slate-800 bg-slate-900 text-slate-300">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr] lg:gap-8">
                    <div className="max-w-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/95 p-1 shadow-lg shadow-black/20 ring-1 ring-white/20">
                                <img
                                    src="/src/assets/images/sewacenterlogo.png"
                                    alt="SewaCenter logo"
                                    className="h-full w-full rounded-xl object-contain"
                                />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                Sewa<span className="text-blue-500">Center</span>
                            </span>
                        </div>
                        <p className="text-[15px] leading-7 text-slate-400">
                            A trusted place to find verified local service experts across Nepal —
                            from plumbers in Pulchowk to electricians in Boudha.
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3.5 py-1.5">
                            <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                                Verified Providers Only
                            </span>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-500">Services</h4>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li>
                                <Link to="/dashboard/categories" className="group inline-flex items-center gap-1 transition-colors duration-200 hover:text-blue-500">
                                    All Categories
                                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/search" className="group inline-flex items-center gap-1 transition-colors duration-200 hover:text-blue-500">
                                    Find Providers
                                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/bookings" className="group inline-flex items-center gap-1 transition-colors duration-200 hover:text-blue-500">
                                    My Bookings
                                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-500">Company</h4>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li><a href="#" className="transition-colors duration-200 hover:text-blue-500">About Us</a></li>
                            <li><a href="#" className="transition-colors duration-200 hover:text-blue-500">Contact</a></li>
                            <li><a href="#" className="transition-colors duration-200 hover:text-blue-500">Privacy Policy</a></li>
                            <li><a href="#" className="transition-colors duration-200 hover:text-blue-500">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-500">Get in Touch</h4>
                        <ul className="space-y-3.5 text-sm text-slate-300">
                            <li className="flex items-center gap-2.5">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800">
                                    <Phone className="h-3.5 w-3.5 text-blue-500" />
                                </span>
                                +977 1-4567890
                            </li>
                            <li className="flex items-center gap-2.5">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800">
                                    <Mail className="h-3.5 w-3.5 text-blue-500" />
                                </span>
                                hello@sewacenter.com
                            </li>
                            <li className="flex items-center gap-2.5">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800">
                                    <MapPin className="h-3.5 w-3.5 text-blue-500" />
                                </span>
                                Pulchowk, Lalitpur
                            </li>
                        </ul>
                        <div className="mt-6 flex gap-2.5">
                            <a href="#" aria-label="Website" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-600 hover:text-white">
                                <Globe className="h-4 w-4" />
                            </a>
                            <a href="#" aria-label="Telegram" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-600 hover:text-white">
                                <Send className="h-4 w-4" />
                            </a>
                            <a href="#" aria-label="Messenger" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-600 hover:text-white">
                                <MessageCircle className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-center sm:flex-row sm:text-left">
                    <p className="text-xs text-slate-500">© 2026 SewaCenter. All rights reserved.</p>
                    <p className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
                        Made with care in Kathmandu, Nepal
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
