import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    ChevronRight, Loader, AlertCircle, Tag, ClipboardList,
    CheckCircle, Search, ArrowRight
} from 'lucide-react';
import { catalogServicesApi } from '../../services/api';
import { categories } from '../../data/categories';

const ServicesPage = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categoryInfo = categories.find(c => c.id === categoryId);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const data = await catalogServicesApi.getAll({ categoryId });
                setServices(data);
            } catch (err) {
                setError(err.message || 'Failed to load services');
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, [categoryId]);

    const fixedPrice = services.filter(s => s.serviceType === 'FIXED_PRICE');
    const inspectionBased = services.filter(s => s.serviceType === 'INSPECTION_BASED');

    const handleSelect = (service) => {
        // Both FIXED_PRICE and INSPECTION_BASED go to the providers page
        // filtered by this specific catalog service (so only providers who
        // have added this service in their profile are shown).
        // The AI-matching card is a separate entry point for unstructured issues.
        navigate(`/providers?catalogServiceId=${service.id}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <Loader className="w-8 h-8 animate-spin text-blue-600" />
                    <p className="text-gray-500 font-medium">Loading services...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
                <p className="text-gray-500 mb-6">{error}</p>
                <button onClick={() => navigate('/categories')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Back to Categories
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-sm text-gray-500 mb-8 gap-1">
                <Link to="/" className="hover:text-blue-600">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link to="/categories" className="hover:text-blue-600">Categories</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium capitalize">{categoryInfo?.name || categoryId}</span>
            </nav>

            {/* Header */}
            <div className="mb-10">
                {categoryInfo?.image && (
                    <div className="relative h-40 rounded-2xl overflow-hidden mb-6">
                        <img src={categoryInfo.image} alt={categoryInfo.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 flex items-center px-8">
                            <div>
                                <h1 className="text-3xl font-bold text-white">{categoryInfo.name}</h1>
                                <p className="text-white/80 mt-1">{categoryInfo.description}</p>
                            </div>
                        </div>
                    </div>
                )}
                <p className="text-slate-600">
                    Select a service below to see available providers. <strong>{fixedPrice.length}</strong> fixed-price and{' '}
                    <strong>{inspectionBased.length}</strong> inspection-based services available.
                </p>
            </div>

            {services.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-12 text-center border border-gray-100">
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No Services Found</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">No services are listed under this category yet.</p>
                    <button onClick={() => navigate('/categories')} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                        Explore Other Categories
                    </button>
                </div>
            ) : (
                <div className="space-y-12">

                    {/* ── CATEGORY A: Fixed Price ──────────────────── */}
                    {fixedPrice.length > 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                                    <Tag className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Fixed Price Services</h2>
                                    <p className="text-sm text-gray-500">Transparent pricing — you know the cost before booking</p>
                                </div>
                                <span className="ml-auto text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">
                                    Category A
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {fixedPrice.map((service) => (
                                    <div
                                        key={service.id}
                                        onClick={() => handleSelect(service)}
                                        className="group bg-white rounded-2xl border border-gray-200 hover:border-emerald-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col overflow-hidden"
                                    >
                                        <div className="p-5 flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{service.name}</h3>
                                                <span className="shrink-0 ml-2 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">Fixed</span>
                                            </div>
                                            <p className="text-gray-500 text-sm leading-relaxed">
                                                {service.description || `Professional ${service.name.toLowerCase()} by verified experts.`}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 px-5 py-4 border-t border-gray-100 flex items-center justify-between group-hover:bg-emerald-50 transition-colors">
                                            <div>
                                                {(() => {
                                                    const staticCat = categories.find(c => c.id === categoryInfo?.id);
                                                    const staticServ = staticCat?.fixedServices?.find(s => s.name.toLowerCase() === service.name.toLowerCase());
                                                    if (staticServ && staticServ.priceRange) {
                                                        return (
                                                            <>
                                                                <p className="text-xs text-gray-500 font-medium mb-0.5">Platform Range</p>
                                                                <p className="text-lg font-bold text-gray-900">{staticServ.priceRange}</p>
                                                            </>
                                                        );
                                                    }
                                                    return (
                                                        <>
                                                            <p className="text-xs text-gray-400 mb-0.5">Starting from</p>
                                                            <p className="text-xl font-bold text-gray-900">Rs. {Number(service.basePrice).toLocaleString()}</p>
                                                        </>
                                                    );
                                                })()}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-semibold">
                                                See Providers <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── CATEGORY B: Inspection Based ────────────── */}
                    {inspectionBased.length > 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                                    <ClipboardList className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Inspection-Based Services</h2>
                                    <p className="text-sm text-gray-500">Provider visits first, quotes after assessment</p>
                                </div>
                                <span className="ml-auto text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full">
                                    Category B
                                </span>
                            </div>

                            {/* Explainer */}
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <div className="text-sm text-amber-800">
                                    <strong>How it works:</strong> You pay a small inspection fee upfront. The provider visits, assesses the problem, then sends you a quote. You can accept or reject it before any work begins.
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {inspectionBased.map((service) => (
                                    <div
                                        key={service.id}
                                        onClick={() => handleSelect(service)}
                                        className="group bg-white rounded-2xl border border-gray-200 hover:border-amber-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col overflow-hidden"
                                    >
                                        <div className="p-5 flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{service.name}</h3>
                                                <span className="shrink-0 ml-2 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">Inspection</span>
                                            </div>
                                            <p className="text-gray-500 text-sm leading-relaxed">
                                                {service.description || `Provider inspects first, then provides a custom quote.`}
                                            </p>
                                            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                                                <CheckCircle className="w-3.5 h-3.5 text-green-500" /> No obligation — reject quote anytime
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-5 py-4 border-t border-gray-100 flex items-center justify-between group-hover:bg-amber-50 transition-colors">
                                            <div>
                                                <p className="text-xs text-gray-400 mb-0.5">Inspection / visit fee</p>
                                                <p className="text-xl font-bold text-gray-900">Rs. {Number(service.inspectionFee).toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-amber-600 text-sm font-semibold">
                                                See Providers <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                                <div
                                    onClick={() => navigate('/ai-match')}
                                    className="group bg-blue-50 rounded-2xl border border-blue-200 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col overflow-hidden"
                                >
                                    <div className="p-5 flex-1 flex flex-col items-center justify-center text-center">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-blue-600 shadow-sm">
                                            <Search className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">Can't find your issue?</h3>
                                        <p className="text-gray-600 text-sm">
                                            Describe your specific problem and Sewa AI will match you with top experts.
                                        </p>
                                    </div>
                                    <div className="bg-blue-100/50 px-5 py-4 border-t border-blue-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors text-blue-700 font-semibold text-sm">
                                        Ask Sewa AI <ArrowRight className="w-4 h-4 ml-1.5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}

                    </div>
                )}
            </div>

        </>
    );
};

export default ServicesPage;
