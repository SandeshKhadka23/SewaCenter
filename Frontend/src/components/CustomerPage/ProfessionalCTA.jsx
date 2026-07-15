import { ArrowRight, Sparkles, ShieldCheck, TrendingUp } from 'lucide-react';

function ProfessionalCTA() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-800 to-sky-500 py-20 text-white sm:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_42%)]" />
            <div className="absolute left-[-3rem] top-8 h-36 w-36 rounded-full bg-sky-300/20 blur-3xl" />
            <div className="absolute bottom-[-2rem] right-[-1rem] h-44 w-44 rounded-full bg-white/10 blur-3xl" />

            <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                <div className="max-w-2xl">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-medium backdrop-blur-sm">
                        <Sparkles className="h-4 w-4" />
                        Grow your service business
                    </div>
                    <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                        Become a professional and reach more customers today
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-slate-200">
                        Join SewaCenter to showcase your skills, get trusted bookings, and grow with a platform designed for local service professionals.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-50">
                            Join as Professional
                            <ArrowRight className="h-4 w-4" />
                        </button>
                        <button className="rounded-2xl border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                            Learn More
                        </button>
                    </div>
                </div>

                <div className="w-full max-w-md rounded-[28px] border border-white/20 bg-slate-950/20 p-6 shadow-2xl shadow-slate-950/25 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-200">Trusted by professionals</p>
                            <p className="text-xl font-bold">More bookings, less hassle</p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                            <span className="text-sm text-slate-200">Verified leads</span>
                            <span className="font-semibold">24/7</span>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                            <span className="text-sm text-slate-200">Average growth</span>
                            <span className="flex items-center gap-1 font-semibold">
                                <TrendingUp className="h-4 w-4" /> 35%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfessionalCTA;
