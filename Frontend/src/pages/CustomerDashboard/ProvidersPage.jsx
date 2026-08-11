import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Star, MapPin, Award, Search, ChevronRight, Wrench, Sparkles } from 'lucide-react';
import { providersApi, catalogServicesApi } from '../../services/api';

const availabilityConfig = {
    available: { label: 'Available', cls: 'bg-green-100 text-green-700' },
    busy: { label: 'Busy', cls: 'bg-amber-100 text-amber-700' },
    offline: { label: 'Offline', cls: 'bg-slate-100 text-slate-600' },
};

export default function ProvidersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('rating');
    const [allProviders, setAllProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [catalogService, setCatalogService] = useState(null);

    // Read catalogServiceId from URL
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const catalogServiceId = searchParams.get('catalogServiceId');

    // Fetch the catalog service details to show context
    useEffect(() => {
        if (catalogServiceId) {
            catalogServicesApi.getById(catalogServiceId)
                .then(setCatalogService)
                .catch(() => setCatalogService(null));
        } else {
            setCatalogService(null);
        }
    }, [catalogServiceId]);

    useEffect(() => {
        const loadProviders = async () => {
            try {
                // If catalogServiceId exists, fetch specific providers, otherwise all
                const data = await providersApi.getAll(catalogServiceId ? { catalogServiceId } : {});
                setAllProviders(data || []);
            } catch (error) {
                console.error("Failed to fetch providers", error);
            } finally {
                setLoading(false);
            }
        };
        loadProviders();
    }, [catalogServiceId]);

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

    const categories = [...new Set(allProviders.map((p) => p.category))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
            {/* Hero Section */}
            {catalogService ? (
                <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white py-10 px-4">
                    <div className="max-w-7xl mx-auto">
                        <nav className="flex items-center gap-1.5 text-sm text-slate-400 mb-4">
                            <Link to="/categories" className="hover:text-white transition-colors">Categories</Link>
                            <ChevronRight className="w-3.5 h-3.5" />
                            <Link to={`/categories/${catalogService.category?.slug}`} className="hover:text-white transition-colors capitalize">
                                {catalogService.category?.name}
                            </Link>
                            <ChevronRight className="w-3.5 h-3.5" />
                            <span className="text-white font-medium">{catalogService.name}</span>
                        </nav>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                        {catalogService.serviceType === 'INSPECTION_BASED'
                                            ? <Wrench className="w-5 h-5 text-amber-400" />
                                            : <Sparkles className="w-5 h-5 text-emerald-400" />}
                                    </div>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                        catalogService.serviceType === 'INSPECTION_BASED'
                                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                                            : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                                    }`}>
                                        {catalogService.serviceType === 'INSPECTION_BASED' ? 'Inspection-Based' : 'Fixed Price'}
                                    </span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-bold mb-1">Providers for: {catalogService.name}</h1>
                                {catalogService.description && (
                                    <p className="text-slate-300 text-sm max-w-2xl">{catalogService.description}</p>
                                )}
                            </div>
                            <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-5 py-3 text-center shrink-0">
                                <Users className="w-5 h-5 text-blue-300" />
                                <div>
                                    <p className="text-2xl font-bold">{allProviders.length}</p>
                                    <p className="text-xs text-slate-400">Available</p>
                                </div>
                            </div>
                        </div>
                        {/* AI nudge for inspection-based */}
                        {catalogService.serviceType === 'INSPECTION_BASED' && (
                            <div className="mt-5 flex items-center gap-3 bg-blue-600/30 border border-blue-500/40 rounded-xl px-4 py-3 text-sm text-blue-200">
                                <Sparkles className="w-4 h-4 shrink-0 text-blue-300" />
                                <span>Can't find what you need, or want AI to match the best expert for your issue?{' '}
                                    <Link to="/ai-match" className="text-white font-semibold underline underline-offset-2 hover:text-blue-100">Try Sewa AI →</Link>
                                </span>
                            </div>
                        )}
                    </div>
                </section>
            ) : (
                <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-14 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-blue-500/30 text-blue-100 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                            <Users className="w-4 h-4" /> {allProviders.length} Providers Available
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Service Providers</h1>
                        <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
                            Browse trusted professionals ready to help you with plumbing, electrical, cleaning, and more.
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
            )}

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
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filtered.length > 0 ? (
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

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const catalogServiceId = searchParams.get('catalogServiceId');

    return (
        <Link
            to={`/providers/${provider.id}${catalogServiceId ? `?catalogServiceId=${catalogServiceId}` : ''}`}
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
