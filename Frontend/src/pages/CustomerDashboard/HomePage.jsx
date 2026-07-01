import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, MapPin, ShieldCheck, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { categories, providers } from '../../data/dummy';
import ProviderCard from '../../components/CustomerPage/ProviderCard';

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
        if (query.trim()) navigate(`/dashboard/search?q=${encodeURIComponent(query.trim())}`);
    };

    const featured = providers.filter((p) => p.rating >= 4.6).slice(0, 4);

    return (
        <div>
            <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900 rounded-full opacity-20 blur-3xl" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-blue-500/30 text-blue-100 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                            <TrendingUp className="w-4 h-4" /> Trusted by 3,800+ customers in Nepal
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                            Find Trusted <br />
                            <span className="text-blue-200">Local Services</span>
                            <br /> Near You
                        </h1>
                        <p className="text-blue-100 text-lg mb-8 leading-relaxed max-w-xl">
                            Book verified plumbers, electricians, cleaners, tutors & more. Fast, affordable, and reliable — all in one place.
                        </p>

                        <form onSubmit={handleSearch} className="flex gap-3 max-w-xl">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="What service do you need?"
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-base"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold rounded-xl transition-colors text-base whitespace-nowrap"
                            >
                                Search
                            </button>
                        </form>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="text-blue-200 text-sm">Popular:</span>
                            {popularSearches.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => navigate(`/dashboard/search?q=${encodeURIComponent(s)}`)}
                                    className="text-sm bg-blue-500/30 hover:bg-blue-500/50 text-blue-100 px-3 py-1 rounded-full transition-colors"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

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

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Browse Categories</h2>
                        <p className="text-slate-500 mt-1">Find the service you need</p>
                    </div>
                    <Link to="/dashboard/categories" className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:gap-2 transition-all">
                        View all <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.slice(0, 8).map((cat) => (
                        <Link
                            key={cat.id}
                            to={`/categories/${cat.id}`}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all p-5"
                        >
                            <img src={cat.image} alt={cat.name} className="w-10 h-10 rounded-lg object-cover mb-3" />
                            <div className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{cat.name}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{cat.providerCount} providers</div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Top Rated Providers</h2>
                        <p className="text-slate-500 mt-1">Highly rated by our community</p>
                    </div>
                    <Link to="/dashboard/search" className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:gap-2 transition-all">
                        See all <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {featured.map((p) => (
                        <ProviderCard key={p.id} provider={p} />
                    ))}
                </div>
            </section>

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
