import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, X, ChevronDown, Home as HomeIcon } from 'lucide-react';
import { providers, categories } from "../../data/dummy";
import ProviderCard from "../../components/CustomerPage/ProviderCard";

const sortOptions = [
    { label: 'Top Rated', value: 'rating' },
    { label: 'Most Reviews', value: 'reviews' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Nearest First', value: 'distance' },
];

export default function CategoryPage() {
    const { categoryId } = useParams();
    const category = categories.find((c) => c.id === categoryId);
    const [sortBy, setSortBy] = useState('rating');
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [selectedAvailability, setSelectedAvailability] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const providersInCategory = useMemo(() => {
        let list = providers.filter((p) => p.categoryId === categoryId);
        if (verifiedOnly) list = list.filter((p) => p.verified);
        if (selectedAvailability) list = list.filter((p) => p.availability === selectedAvailability);

        switch (sortBy) {
            case 'rating': list.sort((a, b) => b.rating - a.rating); break;
            case 'reviews': list.sort((a, b) => b.reviewCount - a.reviewCount); break;
            case 'price_asc': list.sort((a, b) => a.price - b.price); break;
            case 'price_desc': list.sort((a, b) => b.price - a.price); break;
            case 'distance': list.sort((a, b) => a.distance - b.distance); break;
            default: break;
        }
        return list;
    }, [categoryId, sortBy, verifiedOnly, selectedAvailability]);

    if (!category) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-3">Category Not Found</h2>
                <Link to="/categories" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors">
                    Browse All Categories
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap">
                <Link to="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <HomeIcon className="w-3.5 h-3.5" /> Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link to="/categories" className="hover:text-blue-600 transition-colors">Categories</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-slate-700 font-medium">{category.name}</span>
            </nav>

            <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden mb-8">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
                <div className="absolute inset-0 flex items-center px-6 sm:px-10">
                    <div className="text-white">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{category.name}</h1>
                        <p className="text-slate-200 text-sm sm:text-base max-w-lg">{category.description}</p>
                        <p className="mt-3 text-blue-200 text-sm">
                            {providersInCategory.length} {providersInCategory.length === 1 ? 'provider' : 'providers'} available
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 flex-wrap mb-6">
                {categories.filter((c) => c.id !== categoryId).slice(0, 6).map((c) => (
                    <Link
                        key={c.id}
                        to={`/categories/${c.id}`}
                        className="px-4 py-2 rounded-full text-sm font-medium border bg-white border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                    >
                        {c.name}
                    </Link>
                ))}
            </div>

            <div className="flex items-center justify-between gap-3 mb-6">
                <h2 className="text-lg font-semibold text-slate-800">
                    {providersInCategory.length} {providersInCategory.length === 1 ? 'Provider' : 'Providers'}
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${showFilters || verifiedOnly || selectedAvailability
                            ? 'border-blue-400 bg-blue-50 text-blue-600'
                            : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                            }`}
                    >
                        <SlidersHorizontal className="w-4 h-4" /> Filters
                    </button>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none pl-3 pr-8 py-2 border border-slate-300 rounded-xl text-sm text-slate-700 bg-white focus:outline-none focus:border-blue-400 cursor-pointer"
                        >
                            {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {showFilters && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-slate-800 text-sm">Filter Providers</h3>
                        {(verifiedOnly || selectedAvailability) && (
                            <button
                                onClick={() => { setVerifiedOnly(false); setSelectedAvailability(''); }}
                                className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                            >
                                <X className="w-3.5 h-3.5" /> Clear
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Availability</label>
                            <select
                                value={selectedAvailability}
                                onChange={(e) => setSelectedAvailability(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-400"
                            >
                                <option value="">Any</option>
                                <option value="available">Available Now</option>
                                <option value="busy">Busy</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Verification</label>
                            <label className="flex items-center gap-2 cursor-pointer mt-1">
                                <input
                                    type="checkbox"
                                    checked={verifiedOnly}
                                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                                    className="w-4 h-4 accent-blue-600"
                                />
                                <span className="text-sm text-slate-700">Verified providers only</span>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {providersInCategory.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {providersInCategory.map((p) => <ProviderCard key={p.id} provider={p} />)}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">No providers found</h3>
                    <p className="text-slate-400 mb-6">No providers match your current filters.</p>
                    <button
                        onClick={() => { setVerifiedOnly(false); setSelectedAvailability(''); }}
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}
