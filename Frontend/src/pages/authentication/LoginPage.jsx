import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_URL = 'http://localhost:4000';

function Login() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Login failed');
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
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Don't have an account?
                            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"> Sign up</Link>
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
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

                        <div>
                            <button type="submit" disabled={loading}
                                className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200 disabled:opacity-50">
                                {loading ? 'Logging in...' : 'Log in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;