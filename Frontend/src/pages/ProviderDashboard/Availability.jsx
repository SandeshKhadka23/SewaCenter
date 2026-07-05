import { useState } from "react";

export default function Availability() {
  const [available, setAvailable] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Availability
        </h1>

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={available}
            onChange={() => setAvailable(!available)}
          />

          {available ? "Available for Booking" : "Unavailable"}

        </label>

      </div>

    </div>
  );
}