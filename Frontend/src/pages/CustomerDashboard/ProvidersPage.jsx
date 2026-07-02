import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Star, MapPin, Award, Search, ChevronRight } from 'lucide-react';
import { providers } from '../../data/dummy';

const availabilityConfig = {
    available: { label: 'Available', cls: 'bg-green-100 text-green-700' },
    busy: { label: 'Busy', cls: 'bg-amber-100 text-amber-700' },
    offline: { label: 'Offline', cls: 'bg-slate-100 text-slate-600' },
};

export default function ProvidersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('rating');

    const allProviders = providers;

    // Filter logic
    let filtered = [...allProviders];

    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.location.toLowerCase().includes(q) ||
                p.skills?.some((s) => s.toLowerCase().includes(q))
        );
    }

    if (selectedCategory) {
        filtered = filtered.filter((p) => p.categoryId === selectedCategory || p.category === selectedCategory);
    }

    // Sort logic
    switch (sortBy) {
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'reviews':
            filtered.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            break;
    }

    const categories = [...new Set(providers.map((p) => p.category))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-14 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-500/30 text-blue-100 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                        <Users className="w-4 h-4" /> {allProviders.length} Providers Available
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Service Providers</h1>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
                        Browse trusted professionals ready to help you with plumbing, electrical, cleaning, tutoring, and more.
                    </p>
                    <Link
                        to="/become-provider"
                        className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg"
                    >
                        <Award className="w-5 h-5" />
                        Become a Provider
                    </Link>
                </div>
            </section>

            {/* Filters */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, skill, or location..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-400 focus:outline-none min-w-[180px]"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-400 focus:outline-none min-w-[150px]"
                        >
                            <option value="rating">Highest Rated</option>
                            <option value="reviews">Most Reviews</option>
                            <option value="name">Alphabetical</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Providers Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {filtered.length > 0 ? (
                    <>
                        <p className="text-slate-500 mb-6">{filtered.length} provider{filtered.length !== 1 ? 's' : ''} found</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filtered.map((provider) => (
                                <ProviderProfileCard key={provider.id} provider={provider} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-700 mb-2">No providers found</h3>
                        <p className="text-slate-400">Try adjusting your search or filters.</p>
                    </div>
                )}
            </section>
        </div>
    );
}

function ProviderProfileCard({ provider }) {
    const avail = availabilityConfig[provider.availability] || availabilityConfig.available;

    return (
        <Link
            to={`/providers/${provider.id}`}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-200"
        >
            <div className="relative">
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    <img
                        src={provider.avatar}
                        alt={provider.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=3b82f6&color=fff&size=200`;
                        }}
                    />
                </div>
                {provider.verified && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-lg flex items-center gap-1 shadow-md">
                        <Award className="w-3 h-3" /> Verified
                    </div>
                )}
                {provider.isNew && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-lg shadow-md">
                        New
                    </div>
                )}
                <div className="absolute bottom-3 left-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-lg ${avail.cls}`}>{avail.label}</span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-slate-800 text-lg mb-1 truncate">{provider.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-2">{provider.category}</p>

                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{provider.location}</span>
                </div>

                {provider.rating > 0 ? (
                    <div className="flex items-center gap-1.5 mb-3">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-slate-800">{provider.rating}</span>
                        <span className="text-slate-400 text-sm">({provider.reviewCount} reviews)</span>
                    </div>
                ) : (
                    <p className="text-sm text-slate-400 mb-3">No reviews yet</p>
                )}

                <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                        {typeof provider.experience === 'number' ? `${provider.experience} yrs exp` : provider.experience || 'Flexible'}
                    </span>
                    <span className="flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                        View Profile <ChevronRight className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
