import Button from '../CustomerPage/Button';
import worker from '../../assets/images/cropped-worker.png';
import { useNavigate } from 'react-router-dom';


function Hero() {
    const navigate = useNavigate();
    function handleAiClick() {
        console.log("Ai search clicked!");
    }
    return (
        <>
            <section className='bg-white pt-16 pb-24 overflow-hidden'>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className='grid lg:grid-cols-2 gap-12 xl:gap-20 items-center'>
                        <div className='gap-2'>
                            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold px-4 py-2 rounded-full mb-7 border border-green-100">1500+ customer served</div>
                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-1">
                                Find Trusted <br />
                                <span className="text-blue-600">Local Experts</span> <br />
                                Near You
                            </h1>
                            <p className='text-lg text-slate-500 mb-10 leading-relaxed max-w-lg'>Describe your problem or browse professional services. Electricians, plumbers, tutors & more — all in one trusted marketplace.</p>
                            <div className='bg-white border border-slate-200 rounded-2xl p-2 shadow-xl shadow-slate-100 flex gap-2 mb-4 max-w-xl'>
                                <div className='flex-1 flex items-center gap-3 px-4 py-1'><input type="text" placeholder="What do you need help with today?" className="flex-1 outline-none text-slate-700 placeholder:text-slate-400 bg-transparent text-sm" value="" /></div>
                                <div className='hidden sm:flex items-center gap-2 px-4 border-l border-slate-100  cursor-pointer hover:text-blue-600 transition-colors'>
                                    <span className='text-sm text-slate-500 whitespace-nowrap'>kathmandu</span></div>
                                <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm flex-shrink-0' onClick={() => navigate('/search')}>Find Experts</button>
                            </div>
                            <button className='flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors group cursor-pointer' onClick={handleAiClick}>✨Try AI Search:Describe in Plain Language</button>
                        </div>
                        <div className="relative flex justify-center items-end">
                            {/* Blue circle */}
                            <div className="absolute w-110 h-110 rounded-full bg-blue-50"></div>

                            {/* Person */}
                            <img
                                src={worker}
                                alt="Worker"
                                className="relative z-10 h-[400px] object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Hero;