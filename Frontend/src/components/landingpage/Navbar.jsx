import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { ChevronsDown } from "lucide-react";
import Button from './Button';
import Logo from '../../assets/images/sewacenterlogo.png';

function Navbar() {
    const navigate = useNavigate();

    function handleBecomeProvider() {
        navigate('/register-provider');
    }

    function handleLogin() {
        navigate("/login");
    }

    function handleSignup() {
        navigate('/dashboard');
    }

    return (
        <nav className='sticky top-0 z-50 flex w-full flex-row items-center justify-between border-b border-slate-200 bg-white/90 px-8 py-4 shadow-sm backdrop-blur-sm'>
            <img src={Logo} alt='sewacenterlogo' className='h-12 w-40' />

            <div className="
                flex items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-slate-200
                hover:border-blue-500
                cursor-pointer
            ">
                <MapPin size={18} className="text-slate-500" />
                <span>Kathmandu</span>
                <ChevronsDown size={18} className="text-slate-500" />

            </div>

            <div className='flex gap-2'>
                <Button variant='outline' text='Become a Provider' onClick={handleBecomeProvider} />
                <Button variant='secondary' text='Login' onClick={handleLogin} />
                <Button variant='primary' text='Signup' onClick={handleSignup} />
            </div>
        </nav>
    );
}

export default Navbar;