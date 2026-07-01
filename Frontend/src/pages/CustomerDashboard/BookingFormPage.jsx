import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Calendar, Clock, MapPin, ChevronRight, Home as HomeIcon,
    CheckCircle, AlertCircle, Info, FileText
} from 'lucide-react';
import { providers } from '../../data/dummy';

const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM',
];

const serviceOptions = {
    plumbing: ['Pipe Leak Repair', 'Drain Cleaning', 'Bathroom Installation', 'Water Tank Fitting', 'Tap/Faucet Repair', 'Geyser Installation'],
    electrical: ['Wiring & Rewiring', 'Switchboard Replacement', 'Fan/Light Installation', 'CCTV Wiring', 'MCB Box Setup', 'Appliance Installation'],
    cleaning: ['Regular Home Cleaning', 'Deep Cleaning', 'Carpet & Sofa Cleaning', 'Kitchen Deep Clean', 'Office Cleaning', 'Move-in/out Cleaning'],
    tutoring: ['Mathematics Coaching', 'Physics Coaching', 'Computer Science', 'SEE Preparation', '+2 Science Coaching', 'English Grammar'],
    appliance: ['AC Servicing', 'Refrigerator Repair', 'Washing Machine Repair', 'TV Repair', 'Microwave Repair', 'Water Purifier Service'],
    carpentry: ['Custom Furniture', 'Door/Window Repair', 'Shelving & Storage', 'Furniture Polishing', 'Wooden Flooring'],
    painting: ['Interior Painting', 'Exterior Painting', 'Texture & Design', 'Waterproofing', 'Wall Putty Application'],
    mechanic: ['Bike Full Service', 'Car Full Service', 'Oil Change', 'Puncture Fix', 'Engine Tuning', 'Battery Replacement'],
};

export default function BookingFormPage() {
    const { providerId } = useParams();
    const navigate = useNavigate();
    const provider = providers.find((p) => p.id === providerId);
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const today = new Date().toISOString().split('T')[0];

    const [form, setForm] = useState({
        service: '', date: '', time: '', address: '',
        landmark: '', notes: '', contactName: '', contactPhone: '',
    });
    const [errors, setErrors] = useState({});

    if (!provider) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-3">Provider Not Found</h2>
                <Link to="/dashboard/search" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm">Browse Providers</Link>
            </div>
        );
    }

    const availableServices = serviceOptions[provider.categoryId] || provider.skills;

    const validateStep = (s) => {
        const errs = {};
        if (s === 1) {
            if (!form.service) errs.service = 'Please select a service';
            if (!form.date) errs.date = 'Please select a date';
            if (!form.time) errs.time = 'Please select a time slot';
        }
        if (s === 2) {
            if (!form.address.trim()) errs.address = 'Please enter your address';
            if (!form.contactName.trim()) errs.contactName = 'Please enter your name';
            if (!form.contactPhone.trim()) errs.contactPhone = 'Please enter your phone number';
            else if (!/^[0-9]{10}$/.test(form.contactPhone.replace(/\s/g, '')))
                errs.contactPhone = 'Enter a valid 10-digit phone number';
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleNext = () => { if (validateStep(step)) setStep(step + 1); };
    const handleSubmit = () => setSubmitted(true);
    const updateForm = (field, value) => {
        setForm((f) => ({ ...f, [field]: value }));
        setErrors((e) => ({ ...e, [field]: undefined }));
    };

    if (submitted) {
        return (
            <div className="max-w-lg mx-auto px-4 py-16 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Booking Confirmed!</h2>
                <p className="text-slate-500 mb-2">Your booking with <span className="font-semibold text-slate-700">{provider.name}</span> has been placed.</p>
                <p className="text-slate-500 mb-8">
                    <span className="font-medium text-slate-700">{form.date}</span> at <span className="font-medium text-slate-700">{form.time}</span>
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-700 text-left mb-8">
                    <p className="font-semibold mb-1 flex items-center gap-1.5"><Info className="w-4 h-4" /> What's next?</p>
                    <ul className="space-y-1 list-disc list-inside text-blue-600">
                        <li>The provider will confirm your booking shortly.</li>
                        <li>You'll receive a call from {provider.name}.</li>
                        <li>Track your booking in My Bookings.</li>
                    </ul>
                </div>
                <div className="flex gap-3 justify-center">
                    <button onClick={() => navigate('/dashboard/bookings')} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors">
                        View Bookings
                    </button>
                    <button onClick={() => navigate('/dashboard')} className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-xl font-medium text-sm hover:border-slate-400 transition-colors">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap">
                <Link to="/dashboard" className="flex items-center gap-1 hover:text-blue-600"><HomeIcon className="w-3.5 h-3.5" /> Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link to={`/dashboard/providers/${provider.id}`} className="hover:text-blue-600">{provider.name}</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-slate-700 font-medium">Book</span>
            </nav>

            <h1 className="text-2xl font-bold text-slate-800 mb-1">Book Service</h1>
            <p className="text-slate-500 mb-8">with <span className="font-semibold text-slate-700">{provider.name}</span></p>

            <div className="flex items-center mb-10">
                {[{ n: 1, label: 'Service & Time' }, { n: 2, label: 'Your Details' }, { n: 3, label: 'Review' }].map(({ n, label }, i) => (
                    <div key={n} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step > n ? 'bg-green-500 text-white' : step === n ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                                }`}>
                                {step > n ? <CheckCircle className="w-5 h-5" /> : n}
                            </div>
                            <span className="text-xs mt-1 text-slate-500 font-medium whitespace-nowrap hidden sm:block">{label}</span>
                        </div>
                        {i < 2 && <div className={`flex-1 h-0.5 mx-1 ${step > n + 1 ? 'bg-green-400' : step > n ? 'bg-blue-400' : 'bg-slate-200'}`} />}
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-3">
                    <img src={provider.avatar} alt={provider.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                        <div className="font-semibold text-slate-800">{provider.name}</div>
                        <div className="text-sm text-blue-600">{provider.category}</div>
                    </div>
                    <div className="ml-auto text-right">
                        <div className="font-bold text-slate-800">Rs. {provider.price.toLocaleString()}</div>
                        <div className="text-xs text-slate-400">{provider.priceUnit}</div>
                    </div>
                </div>

                <div className="p-5 sm:p-6">
                    {step === 1 && (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Select Service <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {availableServices.map((svc) => (
                                        <button key={svc} type="button" onClick={() => updateForm('service', svc)}
                                            className={`text-left px-4 py-3 rounded-xl border text-sm transition-colors ${form.service === svc ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                                }`}
                                        >{svc}</button>
                                    ))}
                                </div>
                                {errors.service && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.service}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        <Calendar className="w-4 h-4 inline mr-1.5" />Preferred Date <span className="text-red-500">*</span>
                                    </label>
                                    <input type="date" min={today} value={form.date} onChange={(e) => updateForm('date', e.target.value)}
                                        className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 ${errors.date ? 'border-red-400' : 'border-slate-300 focus:border-blue-400'}`}
                                    />
                                    {errors.date && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.date}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        <Clock className="w-4 h-4 inline mr-1.5" />Time Slot <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto pr-1">
                                        {timeSlots.map((t) => (
                                            <button key={t} type="button" onClick={() => updateForm('time', t)}
                                                className={`py-2 rounded-lg border text-xs font-medium transition-colors ${form.time === t ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                                    }`}
                                            >{t}</button>
                                        ))}
                                    </div>
                                    {errors.time && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.time}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                                <input type="text" value={form.contactName} onChange={(e) => updateForm('contactName', e.target.value)} placeholder="Your full name"
                                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 ${errors.contactName ? 'border-red-400' : 'border-slate-300 focus:border-blue-400'}`}
                                />
                                {errors.contactName && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.contactName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                                <input type="tel" value={form.contactPhone} onChange={(e) => updateForm('contactPhone', e.target.value)} placeholder="98XXXXXXXX"
                                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 ${errors.contactPhone ? 'border-red-400' : 'border-slate-300 focus:border-blue-400'}`}
                                />
                                {errors.contactPhone && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.contactPhone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    <MapPin className="w-4 h-4 inline mr-1.5" />Service Address <span className="text-red-500">*</span>
                                </label>
                                <textarea value={form.address} onChange={(e) => updateForm('address', e.target.value)}
                                    placeholder="House no., Street, Ward, Municipality/City" rows={2}
                                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none ${errors.address ? 'border-red-400' : 'border-slate-300 focus:border-blue-400'}`}
                                />
                                {errors.address && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.address}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Landmark (Optional)</label>
                                <input type="text" value={form.landmark} onChange={(e) => updateForm('landmark', e.target.value)}
                                    placeholder="Near school, temple, chowk..."
                                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    <FileText className="w-4 h-4 inline mr-1.5" />Additional Notes (Optional)
                                </label>
                                <textarea value={form.notes} onChange={(e) => updateForm('notes', e.target.value)}
                                    placeholder="Describe the issue or any specific requirements..." rows={3}
                                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none"
                                />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-slate-800 mb-3">Review Your Booking</h3>
                            {[
                                { label: 'Service', value: form.service },
                                { label: 'Date', value: new Date(form.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
                                { label: 'Time', value: form.time },
                                { label: 'Contact', value: form.contactName },
                                { label: 'Phone', value: form.contactPhone },
                                { label: 'Address', value: `${form.address}${form.landmark ? ` (Near ${form.landmark})` : ''}` },
                                ...(form.notes ? [{ label: 'Notes', value: form.notes }] : []),
                            ].map(({ label, value }) => (
                                <div key={label} className="flex gap-3 py-3 border-b border-slate-100 last:border-0">
                                    <span className="text-slate-500 text-sm w-24 shrink-0">{label}</span>
                                    <span className="text-slate-800 text-sm font-medium">{value}</span>
                                </div>
                            ))}
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 flex gap-2 mt-2">
                                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                                <span>
                                    {provider.priceType === 'inspection'
                                        ? `Rs. ${provider.price.toLocaleString()} is the inspection/visit fee. Final price depends on the job.`
                                        : `Fixed price: Rs. ${provider.price.toLocaleString()} ${provider.priceUnit}.`}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                        <button type="button"
                            onClick={() => step === 1 ? navigate(`/providers/${provider.id}`) : setStep(step - 1)}
                            className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-sm font-medium hover:border-slate-400 transition-colors"
                        >
                            {step === 1 ? 'Cancel' : 'Back'}
                        </button>
                        <button type="button" onClick={step === 3 ? handleSubmit : handleNext}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                            {step === 3 ? 'Confirm Booking' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
