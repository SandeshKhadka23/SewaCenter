import { CalendarCheck, CheckCheck, Search, UserCheck } from 'lucide-react';

const steps = [
    {
        title: 'Search',
        description: 'Describe your problem or browse service categories to find what you need.',
        icon: Search,
    },
    {
        title: 'Choose Expert',
        description: 'Compare verified profiles, ratings, and prices to pick the best match.',
        icon: UserCheck,
    },
    {
        title: 'Book Service',
        description: 'Select a convenient date and time slot. Confirm in a single tap.',
        icon: CalendarCheck,
    },
    {
        title: 'Get it Done',
        description: 'Your expert arrives on time. Pay securely only after the job is done.',
        icon: CheckCheck,
    },
];

function Howitworks() {
    return (
        <section className="bg-slate-50 py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Simple process</p>
                    <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">How it works</h2>
                    <p className="mt-4 text-lg text-slate-500">Get your task done in four simple steps with trusted local experts.</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div key={step.title} className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm shadow-slate-200/70">
                                <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-100">
                                    <Icon className="h-8 w-8 text-white" />
                                    <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-sm font-bold text-blue-600">
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-slate-900">{step.title}</h3>
                                <p className="text-sm leading-relaxed text-slate-500">{step.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Howitworks;