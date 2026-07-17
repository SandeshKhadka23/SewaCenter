import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_URL = 'http://localhost:4000';

function Signup() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [form, setForm] = useState({ name: '', role: '', email: '', password: '', terms: false });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!form.terms) {
            setError('You must agree to the Terms of Service and Privacy Policy');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    role: form.role,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Signup failed');
                return;
            }
            setUser(data.user);
            navigate('/');
        } catch (err) {
            setError('Could not reach the server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Create an account</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Already have an account?
                            <Link to='/Login' className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"> Sign in</Link>
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" id="name" name="name" required
                                value={form.name} onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                placeholder="John Doe" />
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select id="role" name="role" required
                                value={form.role} onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                <option value="" className='text-gray-600'>Select Role</option>
                                <option value="customer" className='text-gray-600'>Customer</option>
                                <option value="provider" className='text-gray-600'>Provider</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" id="email" name="email" required
                                value={form.email} onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                placeholder="you@example.com" />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password" name="password" required
                                value={form.password} onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                placeholder="••••••••" />
                        </div>

                        <div className="flex items-center">
                            <input type="checkbox" id="terms" name="terms" required
                                checked={form.terms} onChange={handleChange}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                                I agree to the
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"> Terms of Service</a>
                                {' '}and
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"> Privacy Policy</a>
                            </label>
                        </div>

                        <div>
                            <button type="submit" disabled={loading}
                                className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200 disabled:opacity-50">
                                {loading ? 'Signing up...' : 'Sign up'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;