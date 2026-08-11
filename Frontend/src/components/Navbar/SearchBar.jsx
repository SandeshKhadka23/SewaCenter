import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../../context/LocationContext";

function SearchBar() {
    const navigate = useNavigate();
    const { location } = useLocation();
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        const q = query.trim();
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (location && location !== "All Locations") params.set("location", location);
        navigate(`/search?${params.toString()}`);
    };

    return (
        <form
            onSubmit={handleSearch}
            className="flex items-center bg-white border border-slate-200 rounded-full overflow-hidden shadow-sm w-full max-w-xl"
        >
            <div className="flex items-center flex-1 px-4">
                <Search size={18} className="text-slate-400 shrink-0" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search services, providers..."
                    className="w-full px-3 py-3 outline-none text-sm text-slate-800 placeholder:text-slate-400"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium text-sm transition-colors shrink-0"
            >
                Search
            </button>
        </form>
    );
}

export default SearchBar;