import { useState } from "react";

export default function EditProfile() {
  const [provider, setProvider] = useState({
    name: "Ram Sharma",
    phone: "9800000000",
    city: "Kathmandu",
    experience: "5 Years",
    rate: "800",
  });

  const handleChange = (e) => {
    setProvider({
      ...provider,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Edit Profile
        </h1>

        <input
          name="name"
          value={provider.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          name="phone"
          value={provider.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          name="city"
          value={provider.city}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          name="experience"
          value={provider.experience}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          name="rate"
          value={provider.rate}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Save Changes
        </button>

      </div>
    </div>
  );
}