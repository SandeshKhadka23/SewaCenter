import { useState } from "react";
import { useNavigate } from "react-router-dom";
import worker from "../../assets/images/cropped-worker.png";

function Hero() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        const query = searchQuery.trim();

        navigate(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
    };

    const handleAiClick = () => {
        navigate("/ai-match");
    };

    return (
        <section className="overflow-hidden bg-white pb-24 pt-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-20">
                    <div>
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
                            1500+ customers served
                        </div>

                        <h1 className="mb-1 text-5xl font-bold leading-tight lg:text-6xl">
                            Find Trusted <br />
                            <span className="text-blue-600">Local Experts</span> <br />
                            Near You
                        </h1>

                        <p className="mb-10 max-w-lg text-lg leading-relaxed text-slate-500">
                            Describe your problem or browse professional services.
                            Electricians, plumbers, tutors and more — all in one trusted
                            marketplace.
                        </p>

                        <form
                            onSubmit={handleSearch}
                            className="mb-4 flex max-w-xl gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-100"
                        >
                            <div className="flex flex-1 items-center gap-3 px-4 py-1">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    placeholder="What do you need help with today?"
                                    className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                />
                            </div>

                            <div className="hidden cursor-pointer items-center gap-2 border-l border-slate-100 px-4 transition-colors hover:text-blue-600 sm:flex">
                                <span className="whitespace-nowrap text-sm text-slate-500">
                                    Kathmandu
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="flex-shrink-0 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                            >
                                Find Experts
                            </button>
                        </form>

                        <button
                            type="button"
                            onClick={handleAiClick}
                            className="group flex cursor-pointer items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                        >
                            ✨ Try AI Search: Describe in Plain Language
                        </button>
                    </div>

                    <div className="relative flex items-end justify-center">
                        <div className="absolute h-[440px] w-[440px] rounded-full bg-blue-50" />
                        <img
                            src={worker}
                            alt="Local service professional"
                            className="relative z-10 h-[400px] object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
