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
        <div className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm shadow-slate-200/70 transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
            <Link to={`/providers/${provider.id}`}>
                <div className="relative h-36 overflow-hidden bg-slate-100">
                    <img
                        src={provider.coverImage}
                        alt={provider.category}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                    <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${avail.cls}`}>
                        {avail.label}
                    </span>
                </div>
            </Link>

            <div className="p-4">
                <div className="flex items-start gap-3">
                    <img
                        src={provider.avatar}
                        alt={provider.name}
                        className="h-11 w-11 shrink-0 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                            <Link
                                to={`/providers/${provider.id}`}
                                className="truncate text-sm font-semibold text-slate-800 transition-colors hover:text-blue-600"
                            >
                                {provider.name}
                            </Link>
                            {provider.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-blue-500" />}
                        </div>
                        <p className="text-xs font-medium text-blue-600">{provider.category}</p>
                    </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                    <StarRating rating={provider.rating} showNumber reviewCount={provider.reviewCount} />
                </div>

                <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {provider.location}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {provider.responseTime}
                    </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <span className="text-lg font-bold text-slate-800">Rs. {provider.price.toLocaleString()}</span>
                        <span className="ml-1 text-xs text-slate-400">{provider.priceUnit}</span>
                    </div>
                    <Link
                        to={`/providers/${provider.id}`}
                        className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
