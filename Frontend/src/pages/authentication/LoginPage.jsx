import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authApi } from "../../services/api";

function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (error) setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = form.email.trim();
        const password = form.password;

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const result = await authApi.login({ email, password });

            if (!result?.user) {
                throw new Error("Invalid response received from the server.");
            }

            setUser(result.user);

            const role = String(result.user.role || "").toLowerCase();
            const requestedPath = location.state?.from;

            if (requestedPath) {
                navigate(requestedPath, { replace: true });
            } else if (role === "admin") {
                navigate("/admin", { replace: true });
            } else if (role === "provider") {
                navigate("/provider", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        } catch (loginError) {
            setError(loginError.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Welcome back
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Don&apos;t have an account?
                        <Link
                            to="/signup"
                            className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>

                {error && (
                    <div
                        role="alert"
                        className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        {error}
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            disabled={loading}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-100 sm:text-sm"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            autoComplete="current-password"
                            value={form.password}
                            onChange={handleChange}
                            disabled={loading}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-100 sm:text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
