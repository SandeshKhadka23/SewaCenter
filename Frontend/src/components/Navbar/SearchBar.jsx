import { Search } from "lucide-react";

function SearchBar() {
    return (
        <div className="flex items-center bg-white border border-slate-200 rounded-full overflow-hidden shadow-sm w-full max-w-xl">

            <div className="flex items-center flex-1 px-4">
                <Search size={18} className="text-slate-400" />

                <input
                    type="text"
                    placeholder="Search services..."
                    className="w-full px-3 py-3 outline-none text-sm"
                />
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium">
                Search
            </button>

        </div>
    );
}

export default SearchBar;