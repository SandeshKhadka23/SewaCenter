import { Sparkles, LayoutGrid } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import Logo from "../../assets/images/sewacenterlogo.png";

import SearchBar from "./SearchBar";
import LocationSelector from "./LocationSelector";
import NotificationButton from "./NotificationButton";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";

import Button from "../CustomerPage/Button";

function Navbar() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

                {/* Logo */}
                <img
                    src={Logo}
                    alt="logo"
                    className="h-11 cursor-pointer shrink-0"
                    onClick={() => navigate('/')}
                />

                {/* Search + Location */}
                <div className="hidden lg:flex items-center gap-3 flex-1 justify-center">
                    <SearchBar />
                    <LocationSelector />
                </div>

                {/* Right Side */}
                {user ? (
                    <div className="flex items-center gap-2 shrink-0">
                        {/* AI Search */}
                        <button
                            onClick={() => navigate('/ai-match')}
                            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-blue-50 text-blue-600 transition font-medium text-sm"
                            title="AI-powered provider matching"
                        >
                            <Sparkles size={17} />
                            <span className="hidden xl:block">AI Match</span>
                        </button>

                        {/* Categories */}
                        <button
                            onClick={() => navigate('/categories')}
                            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-slate-50 text-slate-700 transition font-medium text-sm border border-slate-200"
                            title="Browse categories"
                        >
                            <LayoutGrid size={17} />
                            <span className="hidden xl:block">Categories</span>
                        </button>

                        <NotificationButton />
                        <ProfileMenu />
                    </div>
                ) : (
                    <div className="flex items-center gap-2 shrink-0">
                        <Button
                            variant="outline"
                            text="Become Provider"
                            onClick={() => navigate('/become-provider')}
                        />
                        <Button
                            variant="secondary"
                            text="Login"
                            onClick={() => navigate('/login')}
                        />
                        <Button
                            variant="primary"
                            text="Signup"
                            onClick={() => navigate('/signup')}
                        />
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;