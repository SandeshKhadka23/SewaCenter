import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { providers, categories } from '../../data/dummy';
import ProviderCard from '../../components/CustomerPage/ProviderCard';

const sortOptions = [
    { label: 'Best Match', value: 'match' },
    { label: 'Highest Rated', value: 'rating' },
    { label: 'Most Reviews', value: 'reviews' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Nearest First', value: 'distance' },
];

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const [inputValue, setInputValue] = useState(query);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedAvailability, setSelectedAvailability] = useState('');
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState('match');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmedQuery = inputValue.trim();
        if (trimmedQuery) setSearchParams({ q: trimmedQuery });
        else setSearchParams({});
    };

    const results = useMemo(() => {
        let list = [...providers];

        if (query) {
            const q = query.toLowerCase();
            list = list.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q) ||
                    p.skills.some((s) => s.toLowerCase().includes(q)) ||
                    p.location.toLowerCase().includes(q)
            );
        }
        if (selectedCategory) list = list.filter((p) => p.categoryId === selectedCategory);
        if (selectedAvailability) list = list.filter((p) => p.availability === selectedAvailability);
        if (verifiedOnly) list = list.filter((p) => p.verified);
        if (minRating > 0) list = list.filter((p) => p.rating >= minRating);

        switch (sortBy) {
            case 'rating': list.sort((a, b) => b.rating - a.rating); break;
            case 'reviews': list.sort((a, b) => b.reviewCount - a.reviewCount); break;
            case 'price_asc': list.sort((a, b) => a.price - b.price); break;
            case 'price_desc': list.sort((a, b) => b.price - a.price); break;
            case 'distance': list.sort((a, b) => a.distance - b.distance); break;
            default: break;
        }

        return list;
    }, [query, selectedCategory, selectedAvailability, verifiedOnly, minRating, sortBy]);

    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedAvailability('');
        setVerifiedOnly(false);
        setMinRating(0);
        setSortBy('match');
    };

    const hasActiveFilters = !!(selectedCategory || selectedAvailability || verifiedOnly || minRating > 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <form onSubmit={handleSearch} className="flex gap-3 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search for services, providers, locations..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white text-slate-800 text-base"
                    />
                    {inputValue && (
                        <button
                            type="button"
                            onClick={() => { setInputValue(''); setSearchParams({}); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                    Search
                </button>
                <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm transition-colors ${showFilters || hasActiveFilters
                            ? 'border-blue-400 bg-blue-50 text-blue-600'
                            : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                        }`}
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="hidden sm:block">Filters</span>
                    {hasActiveFilters && (
                        <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center">!</span>
                    )}
                </button>
            </form>

            {showFilters && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-800">Filter Results</h3>
                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                                <X className="w-3.5 h-3.5" /> Clear all
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-400"
                            >
                                <option value="">All Categories</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

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
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                Min Rating: {minRating > 0 ? `${minRating}+` : 'Any'}
                            </label>
                            <div className="flex gap-2">
                                {[0, 4, 4.5, 4.8].map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setMinRating(r)}
                                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors ${minRating === r
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                            }`}
                                    >
                                        {r === 0 ? 'Any' : `${r}+`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Other</label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={verifiedOnly}
                                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                                    className="w-4 h-4 rounded accent-blue-600"
                                />
                                <span className="text-sm text-slate-700">Verified providers only</span>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                        {query ? (<>Results for "<span className="text-blue-600">{query}</span>"</>) : 'All Providers'}
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5">{results.length} providers found</p>
                </div>

                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none pl-3 pr-8 py-2 border border-slate-300 rounded-xl text-sm text-slate-700 bg-white focus:outline-none focus:border-blue-400 cursor-pointer"
                    >
                        {sortOptions.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
            </div>

            <div className="flex gap-2 flex-wrap mb-6">
                <button
                    onClick={() => setSelectedCategory('')}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${!selectedCategory ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                        }`}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${selectedCategory === cat.id
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {results.map((p) => (
                        <ProviderCard key={p.id} provider={p} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <Search className="w-14 h-14 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">No providers found</h3>
                    <p className="text-slate-400 mb-6">Try adjusting your search or clearing filters.</p>
                    <button onClick={clearFilters} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors">
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}
