import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown, Check } from "lucide-react";
import { useLocation, NEPAL_LOCATIONS } from "../../context/LocationContext";

function LocationSelector() {
    const { location, setLocation } = useLocation();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="relative shrink-0" ref={ref}>
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 px-4 py-3 rounded-full border border-slate-200 hover:border-blue-400 transition bg-white shadow-sm"
            >
                <MapPin size={16} className="text-blue-600 shrink-0" />
                <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
                    {location === "All Locations" ? "Location" : location}
                </span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <div className="absolute right-0 top-14 w-48 bg-white rounded-2xl border border-slate-100 shadow-xl z-50 overflow-hidden">
                    <div className="py-1 max-h-64 overflow-y-auto">
                        {NEPAL_LOCATIONS.map((loc) => (
                            <button
                                key={loc}
                                onClick={() => { setLocation(loc); setOpen(false); }}
                                className={`flex items-center justify-between w-full px-4 py-2.5 text-sm text-left transition-colors ${
                                    location === loc
                                        ? "bg-blue-50 text-blue-700 font-medium"
                                        : "text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                {loc}
                                {location === loc && <Check size={14} className="text-blue-600" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default LocationSelector;