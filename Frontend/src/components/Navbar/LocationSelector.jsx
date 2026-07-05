import { MapPin, ChevronDown } from "lucide-react";

function LocationSelector() {

    return (

        <div className="flex items-center gap-2 px-4 py-3 rounded-full border border-slate-200 cursor-pointer hover:border-blue-500 transition">

            <MapPin size={18} className="text-blue-600" />

            <span className="text-sm font-medium">
                Kathmandu
            </span>

            <ChevronDown size={16} />

        </div>

    );

}

export default LocationSelector;