import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    MapPin, BadgeCheck, Clock, Briefcase, Star, ChevronRight,
    Home as HomeIcon, Phone, MessageSquare, Calendar, Share2, Heart
} from 'lucide-react';
import { useState } from 'react';
import { providers } from "../../data/dummy";
import StarRating from "../../components/CustomerPage/StarRating";

const availabilityConfig = {
    available: { label: 'Available Now', cls: 'bg-green-100 text-green-700 border-green-200' },
    busy: { label: 'Currently Busy', cls: 'bg-amber-100 text-amber-700 border-amber-200' },
    offline: { label: 'Offline', cls: 'bg-slate-100 text-slate-500 border-slate-200' },
};

export default function ProviderProfilePage() {
    const { providerId } = useParams();
    const navigate = useNavigate();
    const provider = providers.find((p) => p.id === providerId);
    const [wishlisted, setWishlisted] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    if (!provider) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-3">Provider Not Found</h2>
                <Link to="/search" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors">
                    Browse Providers
                </Link>
            </div>
        );
    }

    const avail = availabilityConfig[provider.availability] || availabilityConfig.offline;
    const similarProviders = providers
        .filter((p) => p.categoryId === provider.categoryId && p.id !== provider.id)
        .slice(0, 3);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap">
                <Link to="/" className="flex items-center gap-1 hover:text-blue-600"><HomeIcon className="w-3.5 h-3.5" /> Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link to="/categories" className="hover:text-blue-600">Categories</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link to={`/categories/${provider.categoryId}`} className="hover:text-blue-600">{provider.category}</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-slate-700 font-medium truncate">{provider.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="relative h-52 sm:h-64 rounded-2xl overflow-hidden">
                        <img src={provider.coverImage} alt={provider.category} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 right-4 flex gap-2">
                            <button
                                onClick={() => setWishlisted(!wishlisted)}
                                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                            >
                                <Heart className={`w-5 h-5 ${wishlisted ? 'text-red-500 fill-red-500' : 'text-slate-600'}`} />
                            </button>
                            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                                <Share2 className="w-5 h-5 text-slate-600" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
                        <div className="flex items-start gap-4">
                            <img src={provider.avatar} alt={provider.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-md shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800">{provider.name}</h1>
                                    {provider.verified && (
                                        <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full border border-blue-100 font-medium">
                                            <BadgeCheck className="w-3.5 h-3.5" /> Verified
                                        </span>
                                    )}
                                </div>
                                <p className="text-blue-600 font-medium mt-1">{provider.category}</p>
                                <div className="mt-2 flex items-center gap-3 text-sm text-slate-500 flex-wrap">
                                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {provider.location}</span>
                                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {provider.experience} yrs exp</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Responds {provider.responseTime}</span>
                                </div>
                                <div className="mt-3 flex items-center gap-3 flex-wrap">
                                    <StarRating rating={provider.rating} showNumber reviewCount={provider.reviewCount} />
                                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${avail.cls}`}>{avail.label}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex border-b border-slate-200">
                        {['overview', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {tab} {tab === 'reviews' && `(${provider.reviewCount})`}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'overview' && (
                        <div className="space-y-5">
                            <div className="bg-white rounded-2xl border border-slate-200 p-5">
                                <h3 className="font-semibold text-slate-800 mb-3">About</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{provider.bio}</p>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 p-5">
                                <h3 className="font-semibold text-slate-800 mb-3">Skills & Specializations</h3>
                                <div className="flex flex-wrap gap-2">
                                    {provider.skills.map((skill) => (
                                        <span key={skill} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-lg font-medium">{skill}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { label: 'Jobs Done', value: provider.completedJobs },
                                    { label: 'Rating', value: `${provider.rating}/5` },
                                    { label: 'Distance', value: `${provider.distance} km` },
                                ].map((s) => (
                                    <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
                                        <div className="text-2xl font-bold text-blue-600">{s.value}</div>
                                        <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="space-y-4">
                            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-6">
                                <div className="text-center shrink-0">
                                    <div className="text-5xl font-bold text-slate-800">{provider.rating}</div>
                                    <StarRating rating={provider.rating} className="justify-center mt-1" />
                                    <div className="text-xs text-slate-400 mt-1">{provider.reviewCount} reviews</div>
                                </div>
                                <div className="flex-1">
                                    {[5, 4, 3, 2, 1].map((n) => {
                                        const count = provider.reviews.filter((r) => r.rating === n).length;
                                        const pct = provider.reviews.length > 0 ? (count / provider.reviews.length) * 100 : 0;
                                        return (
                                            <div key={n} className="flex items-center gap-2 mb-1.5">
                                                <span className="text-xs text-slate-500 w-4 text-right">{n}</span>
                                                <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                                                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                                                    <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${pct}%` }} />
                                                </div>
                                                <span className="text-xs text-slate-400 w-5">{count}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {provider.reviews.map((review) => (
                                <div key={review.id} className="bg-white rounded-2xl border border-slate-200 p-5">
                                    <div className="flex items-start gap-3">
                                        <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover shrink-0" />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between flex-wrap gap-1">
                                                <span className="font-semibold text-slate-800 text-sm">{review.author}</span>
                                                <span className="text-xs text-slate-400">
                                                    {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                            <StarRating rating={review.rating} className="mt-1 mb-2" />
                                            <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-5">
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm sticky top-24">
                        <div className="mb-4">
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-bold text-slate-800">Rs. {provider.price.toLocaleString()}</span>
                                <span className="text-sm text-slate-400">{provider.priceUnit}</span>
                            </div>
                            {provider.priceType === 'inspection' && (
                                <p className="text-xs text-amber-600 mt-1">* Final price after inspection</p>
                            )}
                        </div>
                        <div className="space-y-3 mb-5">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Clock className="w-4 h-4 text-slate-400" /> Responds in {provider.responseTime}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Briefcase className="w-4 h-4 text-slate-400" /> {provider.completedJobs}+ jobs completed
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <MapPin className="w-4 h-4 text-slate-400" /> {provider.distance} km away
                            </div>
                        </div>
                        <button
                            onClick={() => navigate(`/book/${provider.id}`)}
                            disabled={provider.availability === 'offline'}
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Calendar className="w-4 h-4" />
                            {provider.availability === 'offline' ? 'Currently Unavailable' : 'Book Now'}
                        </button>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-600 hover:border-slate-400 transition-colors">
                                <Phone className="w-4 h-4" /> Call
                            </button>
                            <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-600 hover:border-slate-400 transition-colors">
                                <MessageSquare className="w-4 h-4" /> Message
                            </button>
                        </div>
                    </div>

                    {similarProviders.length > 0 && (
                        <div className="bg-white rounded-2xl border border-slate-200 p-5">
                            <h3 className="font-semibold text-slate-800 mb-4">Similar Providers</h3>
                            <div className="space-y-4">
                                {similarProviders.map((p) => (
                                    <Link key={p.id} to={`/providers/${p.id}`} className="flex items-center gap-3 group">
                                        <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <div className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors truncate">{p.name}</div>
                                            <StarRating rating={p.rating} showNumber reviewCount={p.reviewCount} className="mt-0.5" />
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
