import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ChevronDown, Check, Search } from "lucide-react";
import worker from "../../assets/images/cropped-worker.png";
import { useLocation, NEPAL_LOCATIONS } from "../../context/LocationContext";

function Hero() {
    const navigate = useNavigate();
    const { location, setLocation } = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [locationOpen, setLocationOpen] = useState(false);
    const locationRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (locationRef.current && !locationRef.current.contains(e.target)) {
                setLocationOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        const query = searchQuery.trim();
        if (query) params.set("q", query);
        if (location && location !== "All Locations") params.set("location", location);
        navigate(`/search?${params.toString()}`);
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

                        {/* Search form */}
                        <form
                            onSubmit={handleSearch}
                            className="mb-4 flex max-w-xl rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-100"
                        >
                            {/* Search input */}
                            <div className="flex flex-1 items-center gap-3 px-4 py-1">
                                <Search size={16} className="shrink-0 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    placeholder="What do you need help with today?"
                                    className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                />
                            </div>

                            {/* Location dropdown */}
                            <div
                                ref={locationRef}
                                className="relative hidden border-l border-slate-100 sm:block"
                            >
                                <button
                                    type="button"
                                    onClick={() => setLocationOpen((v) => !v)}
                                    className="flex h-full items-center gap-2 px-4 text-sm text-slate-500 transition-colors hover:text-blue-600"
                                >
                                    <MapPin size={14} className="shrink-0 text-blue-500" />
                                    <span className="max-w-[90px] truncate whitespace-nowrap font-medium">
                                        {location === "All Locations" ? "Location" : location}
                                    </span>
                                    <ChevronDown
                                        size={13}
                                        className={`text-slate-400 transition-transform ${locationOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {locationOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl z-50">
                                        <div className="max-h-60 overflow-y-auto py-1">
                                            {NEPAL_LOCATIONS.map((loc) => (
                                                <button
                                                    key={loc}
                                                    type="button"
                                                    onClick={() => {
                                                        setLocation(loc);
                                                        setLocationOpen(false);
                                                    }}
                                                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                                                        location === loc
                                                            ? "bg-blue-50 font-medium text-blue-700"
                                                            : "text-slate-700 hover:bg-slate-50"
                                                    }`}
                                                >
                                                    {loc}
                                                    {location === loc && (
                                                        <Check size={13} className="text-blue-600" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                className="ml-2 flex-shrink-0 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
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
