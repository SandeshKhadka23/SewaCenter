import { useNavigate } from "react-router-dom";


export default function LoginChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-200">

      {/* Left Blue Glow */}
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-600 rounded-full opacity-80 blur-3xl"></div>

      {/* Right Blue Glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-300 rounded-full opacity-40 blur-3xl"></div>

      {/* Center Glow */}
      <div className="absolute w-[700px] h-[700px] bg-blue-200 rounded-full opacity-20 blur-3xl"></div>

      {/* Login Card */}
      <div className="relative bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Login As
        </h1>

        <button
          onClick={() => navigate("/customer-login")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl mb-4 font-semibold"
        >
          Login as Customer
        </button>

        <button
          onClick={() => navigate("/provider-login")}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
        >
          Login as Provider
        </button>

      </div>

    </div>
  );
}