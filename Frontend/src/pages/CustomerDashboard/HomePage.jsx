import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { categories, providers } from '../../data/dummy';
import ProviderCard from '../../components/CustomerPage/ProviderCard';
import Trust from '../../components/landingpage/Trust';
import Whysewacenter from '../../components/landingpage/Whysewacenter';
import Hero from '../../components/landingpage/Hero';

export default function HomePage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) navigate(`/dashboard/search?q=${encodeURIComponent(query.trim())}`);
    };

    const featured = providers.filter((p) => p.rating >= 4.6).slice(0, 4);

    return (
        <div className="bg-[linear-gradient(180deg,#f8fafc_0%,#f8fbff_100%)]">
            <Hero
                badgeText="1500+ customers served"
                title={
                    <>
                        Find Trusted <span className="text-blue-600">Local Experts</span> <br /> Near You
                    </>
                }
                description="Describe your problem or browse professional services. Electricians, plumbers, tutors, and more — all in one trusted marketplace."
                searchValue={query}
                onSearchChange={setQuery}
                onSearchSubmit={handleSearch}
                showLocation={false}
            />

            <Trust />

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-[-0.02em] text-slate-800 sm:text-3xl">Browse Categories</h2>
                        <p className="mt-1 text-slate-500">Find the service you need</p>
                    </div>
                    <Link to="/dashboard/categories" className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-all hover:gap-2">
                        View all <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {categories.slice(0, 8).map((cat) => (
                        <Link
                            key={cat.id}
                            to={`/dashboard/categories/${cat.id}`}
                            className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70 transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
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
                    <Link to="/dashboard/search" className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-all hover:gap-2">
                        See all <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {featured.map((p) => (
                        <ProviderCard key={p.id} provider={p} />
                    ))}
                </div>
            </section>

            <Whysewacenter />
        </div>
    );
}
