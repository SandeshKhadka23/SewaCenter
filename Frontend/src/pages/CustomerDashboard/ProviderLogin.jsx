import { useNavigate } from "react-router-dom";


export default function ProviderLogin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Provider Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button
          onClick={() => navigate("/provider-dashboard")}
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}