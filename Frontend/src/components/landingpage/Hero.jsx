import { Search } from 'lucide-react';
import worker from '../../assets/images/cropped-worker.png';

function Hero({
    badgeText = '1500+ customers served',
    title = (
        <>
            Find Trusted <span className="text-blue-600">Local Experts</span> <br /> Near You
        </>
    ),
    description = 'Describe your problem or browse professional services. Electricians, plumbers, tutors, and more — all in one trusted marketplace.',
    searchPlaceholder = 'What do you need help with today?',
    searchValue = '',
    onSearchChange = () => {},
    onSearchSubmit = () => {},
    buttonLabel = 'Find Experts',
    secondaryText = '✨ Try AI Search: Describe in Plain Language',
    showLocation = true,
    locationLabel = 'kathmandu',
}) {
    return (
        <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-20">
                    <div className="max-w-2xl">
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
                            {badgeText}
                        </div>
                        <h1 className="mb-4 text-5xl font-bold leading-tight text-slate-900 sm:text-6xl">
                            {title}
                        </h1>
                        <p className="mb-8 max-w-lg text-lg leading-relaxed text-slate-500">
                            {description}
                        </p>
                        <form onSubmit={onSearchSubmit} className="mb-4 flex max-w-xl flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-100 sm:flex-row">
                            <div className="flex flex-1 items-center gap-3 px-4 py-1">
                                <Search className="h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder={searchPlaceholder}
                                    className="w-full flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                    value={searchValue}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                />
                            </div>
                            {showLocation && (
                                <div className="hidden items-center gap-2 border-l border-slate-100 px-4 text-sm text-slate-500 transition-colors hover:text-blue-600 sm:flex">
                                    <span className="whitespace-nowrap">{locationLabel}</span>
                                </div>
                            )}
                            <button type="submit" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
                                {buttonLabel}
                            </button>
                        </form>
                        <button className="flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">
                            {secondaryText}
                        </button>
                    </div>

                    <div className="relative flex items-end justify-center">
                        <div className="absolute h-96 w-96 rounded-full bg-blue-50 sm:h-[28rem] sm:w-[28rem]" />
                        <img src={worker} alt="Worker" className="relative z-10 h-[360px] object-contain sm:h-[400px]" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;