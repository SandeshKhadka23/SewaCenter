import { ShieldCheck, Sparkles, MapPin } from 'lucide-react';

const highlights = [
    {
        icon: ShieldCheck,
        title: 'Verified Experts',
        description: 'Every professional is vetted so you can book with confidence and avoid uncertain handoffs.',
    },
    {
        icon: Sparkles,
        title: 'Fast, Flexible Booking',
        description: 'Find help quickly, compare options, and schedule services that fit your time and budget.',
    },
    {
        icon: MapPin,
        title: 'Trusted Local Support',
        description: 'From home repairs to everyday jobs, SewaCenter connects you with reliable help nearby.',
    },
];

function WhySewaCenter() {
    return (
        <section className="relative overflow-hidden py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-blue-100/60 to-transparent" />
            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center mb-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600">Why SewaCenter?</p>
                    <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">A smoother way to book trusted help.</h2>
                    <p className="mt-4 text-lg text-slate-500 leading-relaxed">
                        SewaCenter turns everyday service booking into a calm, transparent experience with verified professionals, clear options, and dependable support at your fingertips.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {highlights.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-20px_rgba(37,99,235,0.25)]">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-500">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default WhySewaCenter;
