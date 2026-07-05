import { User, ChevronDown } from "lucide-react";

function ProfileMenu() {

    return (

        <button className="flex items-center gap-2 cursor-pointer">

            <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-100">

                <img
                    src="https://i.pravatar.cc/150"
                    alt="profile"
                    className="w-full h-full object-cover"
                />

            </div>

            <ChevronDown size={18} />

        </button>

    );

}

export default ProfileMenu;