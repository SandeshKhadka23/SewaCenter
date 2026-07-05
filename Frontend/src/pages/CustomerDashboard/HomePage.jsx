import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { categories, providers } from '../../data/dummy';
import ProviderCard from '../../components/CustomerPage/ProviderCard';
import Hero from '../../components/landingpage/Hero';
import Howitworks from '../../components/landingpage/Howitworks';

const popularSearches = ['Plumber', 'Electrician', 'Home Cleaning', 'AC Repair', 'Maths Tutor'];

const stats = [
    { label: 'Verified Providers', value: '200+' },
    { label: 'Services Completed', value: '5,000+' },
    { label: 'Happy Customers', value: '3,800+' },
    { label: 'Categories', value: '8+' },
];

export default function HomePage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    const featured = providers.filter((p) => p.rating >= 4.6).slice(0, 4);

    return (
        <div>
            <Hero />
            {/* trust section */}
            <section className="border-b border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                        {stats.map((s) => (
                            <div key={s.label}>
                                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{s.value}</div>
                                <div className="text-sm text-slate-500 mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* categories section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold tracking-[-0.02em] text-slate-800 sm:text-3xl">Browse Categories</h2>
                        <p className="mt-1 text-slate-500">Find the service you need</p>
                    </div>
                    <Link to="/categories" className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:gap-2 transition-all">
                        View all <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {categories.slice(0, 8).map((cat) => (
                        <Link
                            key={cat.id}
                            to={`/categories/${cat.id}`}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all p-5"
                        >
                            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                                <img src={cat.image} alt={cat.name} className="h-8 w-8 rounded-lg object-cover" />
                            </div>
                            <div className="font-semibold text-slate-800 transition-colors group-hover:text-blue-600">{cat.name}</div>
                            <div className="mt-0.5 text-xs text-slate-400">{cat.providerCount} providers</div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-[-0.02em] text-slate-800 sm:text-3xl">Top Rated Providers</h2>
                        <p className="mt-1 text-slate-500">Highly rated by our community</p>
                    </div>
                    <Link to="/search" className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:gap-2 transition-all">
                        See all <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {featured.map((p) => (
                        <ProviderCard key={p.id} provider={p} />
                    ))}
                </div>
            </section>
            <Howitworks />
            {/* trust section */}
            <section className="bg-slate-900 text-white py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
                        {[
                            { icon: ShieldCheck, title: 'Verified Providers', desc: 'All providers are background-checked and verified.' },
                            { icon: Star, title: 'Quality Guaranteed', desc: 'Rated by real customers for every job completed.' },
                            { icon: MapPin, title: 'Local & Nearby', desc: 'Find service providers closest to your location.' },
                        ].map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="flex flex-col items-center gap-3">
                                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold">{title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
