import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authApi } from "../../lib/api";

function Signup() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [form, setForm] = useState({
        name: "",
        role: "",
        email: "",
        password: "",
        terms: false,
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));

        if (error) setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.terms) {
            setError("You must agree to the Terms of Service and Privacy Policy.");
            return;
        }

        if (form.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const result = await authApi.register({
                name: form.name.trim(),
                email: form.email.trim(),
                password: form.password,
                role: form.role,
            });

            if (!result?.data?.token || !result?.data?.user) {
                throw new Error("Invalid response received from the server.");
            }

            authApi.saveSession(result);
            setUser(result.data.user);

            const role = String(result.data.user.role || "").toLowerCase();

            if (role === "provider") {
                navigate("/become-provider", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        } catch (signupError) {
            setError(signupError.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Create an account
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?
                        <Link
                            to="/login"
                            className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                        >
                            Sign in
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
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            autoComplete="name"
                            value={form.name}
                            onChange={handleChange}
                            disabled={loading}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 sm:text-sm"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            required
                            value={form.role}
                            onChange={handleChange}
                            disabled={loading}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 sm:text-sm"
                        >
                            <option value="">Select Role</option>
                            <option value="customer">Customer</option>
                            <option value="provider">Provider</option>
                        </select>
                    </div>

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
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 sm:text-sm"
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
                            minLength={8}
                            autoComplete="new-password"
                            value={form.password}
                            onChange={handleChange}
                            disabled={loading}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 sm:text-sm"
                            placeholder="At least 8 characters"
                        />
                    </div>

                    <div className="flex items-start">
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            checked={form.terms}
                            onChange={handleChange}
                            disabled={loading}
                            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                            htmlFor="terms"
                            className="ml-2 block text-sm text-gray-600"
                        >
                            I agree to the Terms of Service and Privacy Policy.
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Signing up..." : "Sign up"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
