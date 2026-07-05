import provider from "../../assets/images/provider.jpg";

export default function ProviderNavbar() {
  return (
    <header className="sticky top-0 z-20 h-20 bg-white border-b shadow-sm flex items-center justify-between px-8">

      <div>
        <h1 className="text-3xl font-bold">
          Welcome Back, John 👋
        </h1>

        <p className="text-gray-500">
          Here's what's happening today.
        </p>
      </div>

      <div className="flex items-center gap-6">

        <button className="text-2xl">🔔</button>

        <button className="text-2xl">💬</button>

        <img
          src={provider}
          alt="Provider"
          className="w-12 h-12 rounded-full border object-cover"
        />

      </div>

    </header>
  );
}