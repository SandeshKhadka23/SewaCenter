import { Bell } from "lucide-react";

function NotificationButton() {

    return (

        <button className="relative p-2 rounded-full hover:bg-slate-100 transition">

            <Bell size={22} />

            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex justify-center items-center">

                2

            </span>

        </button>

    );

}

export default NotificationButton;