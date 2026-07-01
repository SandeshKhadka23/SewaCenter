import { Link } from 'react-router-dom';
import { Wrench, Mail, Phone, MapPin, Globe, Send, MessageCircle } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                                <Wrench className="w-5 h-5 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-xl font-bold text-white">
                                Service<span className="text-blue-400">Hub</span>
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Your trusted platform for connecting with verified local service providers across Nepal.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/dashboard/categories" className="hover:text-blue-400 transition-colors">All Categories</Link></li>
                            <li><Link to="/dashboard/search" className="hover:text-blue-400 transition-colors">Find Providers</Link></li>
                            <li><Link to="/dashboard/bookings" className="hover:text-blue-400 transition-colors">My Bookings</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Get in Touch</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-400" /> +977 1-4567890
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-400" /> hello@servicehub.com
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-400" /> Pulchowk, Lalitpur
                            </li>
                        </ul>
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <Globe className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <Send className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">© 2026 ServiceHub. All rights reserved.</p>
                    <p className="text-xs text-slate-500">Made with care in Kathmandu, Nepal</p>
                </div>
            </div>
        </footer>
    );
}
