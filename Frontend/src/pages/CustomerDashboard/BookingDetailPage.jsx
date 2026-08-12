import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Loader,
  Phone,
  Mail,
  ShieldCheck,
  CreditCard,
  User,
  Star,
  FileText,
  Zap
} from "lucide-react";
import { bookingsApi, paymentsApi } from "../../services/api";

const statusConfig = {
  PENDING: { label: "Pending", cls: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  pending: { label: "Pending", cls: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  CONFIRMED: { label: "Confirmed", cls: "bg-blue-100 text-blue-700 border-blue-200", icon: CheckCircle },
  confirmed: { label: "Confirmed", cls: "bg-blue-100 text-blue-700 border-blue-200", icon: CheckCircle },
  IN_PROGRESS: { label: "In Progress", cls: "bg-purple-100 text-purple-700 border-purple-200", icon: Loader },
  in_progress: { label: "In Progress", cls: "bg-purple-100 text-purple-700 border-purple-200", icon: Loader },
  COMPLETED: { label: "Completed", cls: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
  completed: { label: "Completed", cls: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
  CANCELLED: { label: "Cancelled", cls: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
  cancelled: { label: "Cancelled", cls: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
};

export default function BookingDetailPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState(null);
  const [updatingCompletion, setUpdatingCompletion] = useState(false);

  useEffect(() => {
    async function loadBooking() {
      try {
        setLoading(true);
        const data = await bookingsApi.getById(bookingId);
        setBooking(data);
      } catch (err) {
        console.error("Failed to load booking detail:", err);
        setError("Failed to load booking details. It may not exist or you do not have permission.");
      } finally {
        setLoading(false);
      }
    }
    if (bookingId) {
      loadBooking();
    }
  }, [bookingId]);

  async function handlePayNow() {
    try {
      setPaying(true);
      setPayError(null);
      const res = await paymentsApi.initiate(bookingId);
      if (res.payment_url) {
        window.location.href = res.payment_url;
      } else {
        setPayError("Payment initiation failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment initiation error:", err);
      setPayError(err.message || "Payment initiation failed. Please try again.");
    } finally {
      setPaying(false);
    }
  }

  async function handleToggleCompletion(e) {
    const isCompleted = e.target.checked;
    try {
      setUpdatingCompletion(true);
      await bookingsApi.customerComplete(bookingId, isCompleted);
      setBooking((prev) => ({
        ...prev,
        customerConfirmedAt: isCompleted ? new Date().toISOString() : null,
      }));
    } catch (err) {
      console.error("Failed to update completion:", err);
      alert("Failed to update job status.");
    } finally {
      setUpdatingCompletion(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm font-medium">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Booking Not Found</h2>
          <p className="text-slate-500 text-sm mb-6">{error || "Unable to fetch requested booking details."}</p>
          <Link
            to="/bookings"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to My Bookings
          </Link>
        </div>
      </div>
    );
  }

  const statusKey = booking.status ? booking.status.toUpperCase() : "PENDING";
  const statusInfo = statusConfig[statusKey] || statusConfig.PENDING;
  const StatusIcon = statusInfo.icon;
  const provider = booking.provider || {};
  const providerUser = provider.user || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Bookings
        </button>

        {/* Card Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-800">
                {booking.serviceName || "Service Booking"}
              </h1>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusInfo.cls}`}>
                <StatusIcon className="w-3.5 h-3.5" />
                {statusInfo.label}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Booking ID: #{booking.id}</p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 block">Total Amount</span>
            <span className="text-2xl font-extrabold text-slate-900">
              Rs. {Number(booking.quotedPrice || 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Booking Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" /> Appointment Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <Calendar className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Scheduled Date</span>
                    <span className="font-semibold text-slate-700">
                      {booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <Clock className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Time Slot</span>
                    <span className="font-semibold text-slate-700">{booking.timeSlot || "N/A"}</span>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Service Address</span>
                    <span className="font-semibold text-slate-700">{booking.address || "No address specified"}</span>
                  </div>
                </div>
              </div>

              {booking.notes && (
                <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                  <span className="text-xs font-semibold text-blue-700 block mb-1">Customer Notes</span>
                  <p className="text-sm text-slate-600 italic">"{booking.notes}"</p>
                </div>
              )}
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-green-600" /> Payment & Billing
              </h2>
              <div className="flex items-center justify-between py-2 text-sm border-b border-slate-100">
                <span className="text-slate-500">Price Type</span>
                <span className="font-medium text-slate-700 capitalize">{provider.priceType || "Fixed"}</span>
              </div>
              <div className="flex items-center justify-between py-2 text-sm border-b border-slate-100">
                <span className="text-slate-500">Quoted Price</span>
                <span className="font-medium text-slate-700">Rs. {Number(booking.quotedPrice || 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-2 text-sm border-b border-slate-100">
                <span className="text-slate-500">Selected Method</span>
                <span className="font-medium text-slate-700 capitalize">{booking.paymentMethod === 'KHALTI' ? 'Khalti Online' : (booking.paymentMethod || "Not Selected")}</span>
              </div>
              <div className="flex items-center justify-between py-2 text-sm border-b border-slate-100">
                <span className="text-slate-500">Payment Status</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  ['RELEASED', 'PAID'].includes(booking.paymentStatus)
                    ? 'bg-green-100 text-green-700'
                    : booking.paymentStatus === 'ESCROW_HELD'
                    ? 'bg-amber-100 text-amber-700'
                    : booking.paymentStatus === 'PENDING'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {['RELEASED', 'PAID'].includes(booking.paymentStatus)
                    ? '✓ Paid'
                    : booking.paymentStatus === 'ESCROW_HELD'
                    ? '🔒 In Escrow'
                    : booking.paymentStatus === 'PENDING'
                    ? 'Pending'
                    : 'Unpaid'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 text-base font-bold text-slate-800">
                <span>Total Due</span>
                <span className="text-blue-600">Rs. {Number(booking.quotedPrice || 0).toLocaleString()}</span>
              </div>

              {/* Pay Now button — only when not yet paid */}
              {!['ESCROW_HELD', 'RELEASED', 'PAID'].includes(booking.paymentStatus) && booking.quotedPrice > 0 && (
                <div className="mt-2 space-y-3">
                  {booking.paymentMethod === 'CASH' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3 text-sm text-blue-800">
                      <p>
                        You selected <strong>Cash on Service Completion</strong>, but you can still pay securely online right now using Khalti.
                      </p>
                      
                      <div className="pt-2 border-t border-blue-200">
                        <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 disabled:opacity-50"
                            checked={!!booking.customerConfirmedAt}
                            onChange={handleToggleCompletion}
                            disabled={updatingCompletion}
                          />
                          Job completed
                          {updatingCompletion && <Loader className="w-4 h-4 animate-spin text-blue-500" />}
                        </label>
                        <p className="text-xs text-slate-500 mt-1 pl-7">
                          Check this box once the service is finished to notify the provider.
                        </p>
                      </div>
                    </div>
                  )}
                  {payError && (
                    <p className="text-xs text-red-600 mb-2 text-center">{payError}</p>
                  )}
                  <button
                    id="pay-now-btn"
                    onClick={handlePayNow}
                    disabled={paying}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white transition-all"
                    style={{
                      background: paying
                        ? '#6b7280'
                        : 'linear-gradient(135deg, #5C2D91 0%, #7C3AED 100%)',
                      boxShadow: paying ? 'none' : '0 4px 15px rgba(124,58,237,0.35)',
                    }}
                  >
                    {paying ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Redirecting to Khalti...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Pay Now via Khalti
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-400 text-center mt-2">
                    Secure payment powered by Khalti · Funds held in escrow
                  </p>
                </div>
              )}

              {/* Release Escrow Button */}
              {booking.paymentStatus === 'ESCROW_HELD' && !booking.customerConfirmedAt && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                        <CheckCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                        <h3 className="font-bold text-amber-800 text-sm mb-1">Funds in Escrow</h3>
                        <p className="text-xs text-amber-700 mb-4">
                            Your payment is securely held. Please confirm when the job is done to release payment to the provider.
                        </p>
                        <button
                            onClick={async () => {
                                try {
                                    setUpdatingCompletion(true);
                                    await paymentsApi.release(bookingId);
                                    setBooking(prev => ({ 
                                        ...prev, 
                                        paymentStatus: 'RELEASED', 
                                        status: 'COMPLETED', 
                                        customerConfirmedAt: new Date().toISOString() 
                                    }));
                                } catch (err) {
                                    alert(err.message || "Failed to release payment.");
                                } finally {
                                    setUpdatingCompletion(false);
                                }
                            }}
                            disabled={updatingCompletion}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 rounded-lg font-semibold text-sm text-white transition-all shadow-sm"
                        >
                            {updatingCompletion ? <Loader className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                            Confirm Job Completed
                        </button>
                    </div>
                </div>
              )}

            </div>
          </div>

          {/* Provider Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" /> Service Provider
              </h2>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={providerUser.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"}
                  alt={providerUser.name || "Provider"}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
                />
                <div>
                  <h3 className="font-bold text-slate-800">{providerUser.name || "Provider"}</h3>
                  <p className="text-xs text-slate-500">{provider.businessName || provider.category || "Service Professional"}</p>
                  {provider.rating && (
                    <div className="flex items-center gap-1 text-xs text-amber-500 mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-semibold">{provider.rating}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                {providerUser.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{providerUser.phone}</span>
                  </div>
                )}
                {providerUser.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{providerUser.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-emerald-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Service Provider</span>
                </div>
              </div>

              {provider.id && (
                <Link
                  to={`/providers/${provider.id}`}
                  className="mt-5 w-full block text-center py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
                >
                  View Profile
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
