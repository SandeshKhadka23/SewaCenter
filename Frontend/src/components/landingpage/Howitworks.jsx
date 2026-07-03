import { Search } from 'lucide-react';
import { CalendarCheck } from 'lucide-react';
import { UserCheck } from 'lucide-react';
import { CheckCheck } from "lucide-react";
function Howitworks() {
    return (
        <section >
            <p className='text-center text-blue-600 font-bold text-lg'>simple process</p>
            <h2 className='text-center text-Blue-900 font-bold text-3xl mt-2 mb-2'>How It Works?</h2>
            <p className='text-center text-slate-500 text-sm mb-10'>Get Your Task Done in Four Simple Steps</p>
            <div className='flex flex-row justify-around items-center flex-wrap'>
                <div className="flex flex-col items-center text-center">

                    {/* Icon wrapper */}
                    <div className="relative mb-5">
                        {/* Blue icon box */}
                        <div className="w-20 h-20 bg-blue-700 rounded-3xl flex items-center justify-center">
                            <Search className="w-10 h-10 text-white" />
                        </div>

                        {/* Number badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">1</span>
                        </div>
                    </div>

                    <h2 className="font-bold text-xl mb-2">Search</h2>

                    <p className="text-slate-500 text-sm leading-relaxed max-w-[220px]">
                        Describe your problem or browse service categories to find what you need.
                    </p>

                </div>
                <div className="flex flex-col items-center text-center">

                    {/* Icon wrapper */}
                    <div className="relative mb-5">
                        {/* Blue icon box */}
                        <div className="w-20 h-20 bg-blue-700 rounded-3xl flex items-center justify-center">
                            <UserCheck className="w-10 h-10 text-white" />
                        </div>

                        {/* Number badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">2</span>
                        </div>
                    </div>

                    <h2 className="font-bold text-xl mb-2">Choose Expert</h2>

                    <p className="text-slate-500 text-sm leading-relaxed max-w-[220px]">
                        Compare verified profiles, ratings, and prices to pick the best match.
                    </p>

                </div>
                <div className="flex flex-col items-center text-center">

                    {/* Icon wrapper */}
                    <div className="relative mb-5">
                        {/* Blue icon box */}
                        <div className="w-20 h-20 bg-blue-700 rounded-3xl flex items-center justify-center">
                            <CalendarCheck className="w-10 h-10 text-white" />
                        </div>

                        {/* Number badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">3</span>
                        </div>
                    </div>

                    <h2 className="font-bold text-xl mb-2">Book Service</h2>

                    <p className="text-slate-500 text-sm leading-relaxed max-w-[220px]">
                        Select a convenient date and time slot. Confirm in a single tap.
                    </p>

                </div>
                <div className="flex flex-col items-center text-center">

                    {/* Icon wrapper */}
                    <div className="relative mb-5">
                        {/* Blue icon box */}
                        <div className="w-20 h-20 bg-blue-700 rounded-3xl flex items-center justify-center">
                            <CheckCheck className="w-10 h-10 text-white" />
                        </div>

                        {/* Number badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">4</span>
                        </div>
                    </div>

                    <h2 className="font-bold text-xl mb-2">Get it Done</h2>

                    <p className="text-slate-500 text-sm leading-relaxed max-w-[220px]">
                        Your expert arrives on time. Pay securely only after the job is done.
                    </p>

                </div>
            </div>

        </section>
    )
}
export default Howitworks;