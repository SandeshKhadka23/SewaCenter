import { createContext, useContext, useState } from "react";

const LocationContext = createContext(null);

export const NEPAL_LOCATIONS = [
    "All Locations",
    "Kathmandu",
    "Lalitpur",
    "Bhaktapur",
    "Pokhara",
    "Biratnagar",
    "Birgunj",
    "Bharatpur",
    "Dharan",
    "Hetauda",
    "Butwal",
    "Nepalgunj",
    "Dhangadhi",
    "Itahari",
    "Janakpur",
];

export function LocationProvider({ children }) {
    const [location, setLocation] = useState("All Locations");
    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    const ctx = useContext(LocationContext);
    if (!ctx) throw new Error("useLocation must be used within LocationProvider");
    return ctx;
}
