import { Link } from 'react-router-dom';
import { MapPin, BadgeCheck, Clock } from 'lucide-react';
import StarRating from './StarRating';

const availabilityConfig = {
    available: { label: 'Available', cls: 'bg-green-100 text-green-700' },
    busy: { label: 'Busy', cls: 'bg-amber-100 text-amber-700' },
    offline: { label: 'Offline', cls: 'bg-slate-100 text-slate-500' },
};

export default function ProviderCard({ provider }) {
    const avail = availabilityConfig[provider.availability] || availabilityConfig.offline;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
            <Link to={`/providers/${provider.id}`}>
                <div className="relative h-36 overflow-hidden bg-slate-101">
                    <img
                        src={provider.coverImage}
                        alt={provider.category}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full ${avail.cls}`}>
                        {avail.label}
                    </span>
                </div>
            </Link>

            <div className="p-4">
                <div className="flex items-start gap-3">
                    <img
                        src={provider.avatar}
                        alt={provider.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <Link
                                to={`/providers/${provider.id}`}
                                className="font-semibold text-slate-800 text-sm hover:text-blue-600 truncate transition-colors"
                            >
                                {provider.name}
                            </Link>
                            {provider.verified && <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" />}
                        </div>
                        <p className="text-xs text-blue-600 font-medium">{provider.category}</p>
                    </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                    <StarRating rating={provider.rating} showNumber reviewCount={provider.reviewCount} />
                </div>

                <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {provider.location}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {provider.responseTime}
                    </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <span className="text-lg font-bold text-slate-800">Rs. {provider.price.toLocaleString()}</span>
                        <span className="text-xs text-slate-400 ml-1">{provider.priceUnit}</span>
                    </div>
                    <Link
                        to={`/providers/${provider.id}`}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                    >
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
