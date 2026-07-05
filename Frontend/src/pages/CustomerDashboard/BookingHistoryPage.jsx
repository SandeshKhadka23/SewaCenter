import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ClipboardList, Calendar, Clock, MapPin, ChevronRight,
    CheckCircle, XCircle, Loader, Star, Plus, Sparkles
} from 'lucide-react';
import { bookings } from '../../data/dummy';
import QuickBookModal from '../../components/CustomerPage/QuickBookModal';

const statusConfig = {
    pending: { label: 'Pending', cls: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
    confirmed: { label: 'Confirmed', cls: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle },
    in_progress: { label: 'In Progress', cls: 'bg-purple-100 text-purple-700 border-purple-200', icon: Loader },
    completed: { label: 'Completed', cls: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
    cancelled: { label: 'Cancelled', cls: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
};

const tabs = [
    { label: 'All', value: 'all' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
];

function filterBookings(list, tab) {
    if (tab === 'upcoming') return list.filter((b) => ['pending', 'confirmed', 'in_progress'].includes(b.status));
    if (tab === 'completed') return list.filter((b) => b.status === 'completed');
    if (tab === 'cancelled') return list.filter((b) => b.status === 'cancelled');
    return list;
}

export default function BookingHistoryPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [reviewOpen, setReviewOpen] = useState(null);
    const [ratings, setRatings] = useState({});
    const [submitted, setSubmitted] = useState(new Set());
    const [showBookModal, setShowBookModal] = useState(false);

    const filtered = filterBookings(bookings, activeTab);
    const counts = {
        all: bookings.length,
        upcoming: bookings.filter((b) => ['pending', 'confirmed', 'in_progress'].includes(b.status)).length,
        completed: bookings.filter((b) => b.status === 'completed').length,
        cancelled: bookings.filter((b) => b.status === 'cancelled').length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
            {/* Decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl" />
                <div className="absolute top-1/3 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header with Quick Book button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                <ClipboardList className="w-5 h-5 text-white" />
                            </div>
                            My Bookings
                        </h1>
                        <p className="text-slate-500 mt-1 ml-14">Track and manage all your service bookings</p>
                    </div>
                    <button
                        onClick={() => setShowBookModal(true)}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <Plus className="w-5 h-5" />
                        Book New Service
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total', value: bookings.length, color: 'text-slate-700', bg: 'bg-white', border: 'border-slate-200', icon: ClipboardList },
                        { label: 'Upcoming', value: counts.upcoming, color: 'text-blue-600', bg: 'bg-gradient-to-br from-blue-50 to-white', border: 'border-blue-200', icon: Clock },
                        { label: 'Completed', value: counts.completed, color: 'text-green-600', bg: 'bg-gradient-to-br from-green-50 to-white', border: 'border-green-200', icon: CheckCircle },
                        { label: 'Cancelled', value: counts.cancelled, color: 'text-red-600', bg: 'bg-gradient-to-br from-red-50 to-white', border: 'border-red-200', icon: XCircle },
                    ].map((s) => (
                        <div key={s.label} className={`${s.bg} ${s.border} border rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow`}>
                            <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-2 opacity-60`} />
                            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
                    <div className="flex border-b border-slate-200 overflow-x-auto">
                        {tabs.map((t) => (
                            <button key={t.value} onClick={() => setActiveTab(t.value)}
                                className={`px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors relative ${activeTab === t.value
                                    ? 'text-blue-600 bg-blue-50/50'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                {t.label}
                                {counts[t.value] > 0 && (
                                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-medium ${activeTab === t.value ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                                        }`}>{counts[t.value]}</span>
                                )}
                                {activeTab === t.value && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Booking List */}
                    {filtered.length > 0 ? (
                        <div className="p-5 space-y-4">
                            {filtered.map((booking) => {
                                const status = statusConfig[booking.status];
                                const StatusIcon = status.icon;
                                const isCompleted = booking.status === 'completed';
                                const hasReviewed = submitted.has(booking.id);
                                const isReviewOpen = reviewOpen === booking.id;

                                return (
                                    <div key={booking.id} className="bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="p-5">
                                            <div className="flex items-start gap-4">
                                                <img src={booking.providerAvatar} alt={booking.providerName} className="w-14 h-14 rounded-xl object-cover shrink-0 border-2 border-white shadow-sm" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 flex-wrap">
                                                        <div>
                                                            <h3 className="font-semibold text-slate-800 text-lg">{booking.service}</h3>
                                                            <p className="text-sm text-slate-500">by <span className="font-medium text-blue-600">{booking.providerName}</span></p>
                                                        </div>
                                                        <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${status.cls}`}>
                                                            <StatusIcon className="w-3.5 h-3.5" /> {status.label}
                                                        </span>
                                                    </div>

                                                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-500">
                                                        <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg">
                                                            <Calendar className="w-4 h-4 text-blue-500" />
                                                            {new Date(booking.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </span>
                                                        <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg">
                                                            <Clock className="w-4 h-4 text-green-500" /> {booking.time}
                                                        </span>
                                                        <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg">
                                                            <MapPin className="w-4 h-4 text-red-400" /> {booking.address}
                                                        </span>
                                                    </div>

                                                    {booking.notes && (
                                                        <div className="mt-2 text-xs text-slate-500 bg-blue-50 rounded-lg px-3 py-2 border border-blue-100">
                                                            <Sparkles className="w-3 h-3 inline mr-1 text-blue-400" />
                                                            "{booking.notes}"
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-200 flex-wrap gap-2">
                                                <div>
                                                    <span className="font-bold text-lg text-slate-800">Rs. {booking.price.toLocaleString()}</span>
                                                    {booking.priceType === 'inspection' && (
                                                        <span className="text-xs text-amber-600 ml-1 bg-amber-50 px-2 py-0.5 rounded-full">(inspection fee)</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {isCompleted && !hasReviewed && (
                                                        <button onClick={() => setReviewOpen(isReviewOpen ? null : booking.id)}
                                                            className="flex items-center gap-1.5 px-4 py-2 border border-amber-300 text-amber-700 rounded-xl text-xs font-medium hover:bg-amber-50 transition-colors"
                                                        >
                                                            <Star className="w-3.5 h-3.5" /> Rate Service
                                                        </button>
                                                    )}
                                                    {isCompleted && hasReviewed && (
                                                        <span className="flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-3 py-2 rounded-xl">
                                                            <CheckCircle className="w-3.5 h-3.5" /> Reviewed
                                                        </span>
                                                    )}
                                                    {!isCompleted && booking.status !== 'cancelled' && (
                                                        <button className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 rounded-xl text-xs font-medium hover:bg-red-50 transition-colors">
                                                            <XCircle className="w-3.5 h-3.5" /> Cancel
                                                        </button>
                                                    )}
                                                    <Link to={`/providers/${booking.providerId}`}
                                                        className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm"
                                                    >
                                                        View Provider <ChevronRight className="w-3.5 h-3.5" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        {isReviewOpen && !hasReviewed && (
                                            <div className="border-t border-slate-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5">
                                                <h4 className="font-semibold text-slate-800 text-sm mb-3 flex items-center gap-2">
                                                    <Star className="w-4 h-4 text-amber-500" />
                                                    Rate your experience
                                                </h4>
                                                <div className="flex items-center gap-1 mb-3">
                                                    {[1, 2, 3, 4, 5].map((n) => (
                                                        <button key={n} onClick={() => setRatings((r) => ({ ...r, [booking.id]: n }))}
                                                            className="transition-transform hover:scale-110"
                                                        >
                                                            <Star className={`w-8 h-8 ${(ratings[booking.id] || 0) >= n ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                                                        </button>
                                                    ))}
                                                    {ratings[booking.id] && (
                                                        <span className="ml-2 text-sm text-slate-600 font-medium">
                                                            {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][ratings[booking.id]]}
                                                        </span>
                                                    )}
                                                </div>
                                                <textarea placeholder="Share your experience (optional)" rows={2}
                                                    className="w-full border border-amber-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-amber-400 resize-none mb-3 bg-white"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            if (ratings[booking.id]) {
                                                                setSubmitted((s) => new Set(s).add(booking.id));
                                                                setReviewOpen(null);
                                                            }
                                                        }}
                                                        disabled={!ratings[booking.id]}
                                                        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        Submit Review
                                                    </button>
                                                    <button onClick={() => setReviewOpen(null)}
                                                        className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-sm font-medium hover:border-slate-400 transition-colors bg-white"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 px-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ClipboardList className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">No bookings here</h3>
                            <p className="text-slate-400 mb-6">You don't have any {activeTab !== 'all' ? activeTab : ''} bookings yet.</p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={() => setShowBookModal(true)}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium text-sm hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                                >
                                    <Plus className="w-4 h-4" />
                                    Book a Service
                                </button>
                                <Link to="/dashboard/search" className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 text-slate-700 rounded-xl font-medium text-sm hover:border-slate-400 transition-colors">
                                    Browse Providers <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <QuickBookModal
                isOpen={showBookModal}
                onClose={() => setShowBookModal(false)}
                onBookingComplete={() => {
                    // Could refresh bookings here if using real data
                }}
            />
        </div>
    );
}
