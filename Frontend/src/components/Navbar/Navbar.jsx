import { Sparkles } from "lucide-react";

import Logo from "../../assets/images/sewacenterlogo.png";

import SearchBar from "./SearchBar";
import LocationSelector from "./LocationSelector";
import NotificationButton from "./NotificationButton";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";

import Button from "../CustomerPage/Button";

function Navbar({ loggedIn = false }) {
    const navigate = useNavigate();


    return (

        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

                {/* Logo */}

                <img
                    src={Logo}
                    alt="logo"
                    className="h-11 cursor-pointer"
                    onClick={() => navigate('/')}
                />

                {/* Search */}

                <div className="hidden lg:flex items-center gap-3 flex-1 justify-center">

                    <SearchBar />

                    <LocationSelector />

                </div>

                {/* Right Side */}

                {loggedIn ? (

                    <div className="flex items-center gap-3">

                        <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-blue-50 text-blue-600 transition">

                            <Sparkles size={18} />

                            <span className="font-medium">
                                AI Search
                            </span>

                        </button>

                        <Button
                            variant="secondary"
                            text="Categories"
                        />

                        <NotificationButton />

                        <ProfileMenu />

                    </div>

                ) : (

                    <div className="flex items-center gap-2">

                        <Button
                            variant="outline"
                            text="Become Provider"
                            onClick={() => navigate('/becomeprovider')}
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